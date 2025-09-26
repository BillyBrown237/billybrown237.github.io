import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { TokenPayloadI } from './token-payload.interface';
import { TemporaryTokensService } from '../temporary-tokens/temporary-tokens.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tempTokensService: TemporaryTokensService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userRepository.findOne({
      where: { username: registerDto.username },
    });
    if (user)
      throw new ConflictException(
        `User with username ${user.username} already exists`,
      );
    const { password, ...rest } = registerDto;
    // Hashing the user password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newAdmin = this.userRepository.create({
      ...rest,
      passwordHash: passwordHash,
    });
    return await this.userRepository.save(newAdmin);
  }

  login(user: User, response: Response) {
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    const tokenPayload: TokenPayloadI = {
      uuid: user.uuid,
      role: user.role,
      username: user.username,
    };
    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS')}ms`,
    });

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'lax',
      expires: expiresAccessToken,
    });
  }

  async findOne(user: User) {
    const admin = await this.userRepository.findOne({
      where: { uuid: user.uuid },
    });
    if (!admin) {
      throw new NotFoundException(`User with ID ${user.uuid} not found`);
    }
    return admin;
  }

  async tempLogin(token: string, response: Response) {
    const record = await this.tempTokensService.validateToken(token);
    if (!record) {
      throw new UnauthorizedException('Invalid or expired temporary token');
    }

    const permissions = record.permissions?.map((p) => p.name) ?? [];

    const expiresAccessToken = new Date(record.expiredAt);

    const payload: TokenPayloadI = {
      temp: true,
      permissions,
      tempTokenId: record.uuid,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: Math.max(1, expiresAccessToken.getTime() - Date.now()) + 'ms',
    });

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'lax',
      expires: expiresAccessToken,
    });

    // mark token as used
    await this.tempTokensService.markUsed(record.uuid);
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findByUsername(loginDto.username);
    if (!user) return null;

    const isMatch = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isMatch) return null;
    const { passwordHash, ...result } = user;
    return result;
  }
}
