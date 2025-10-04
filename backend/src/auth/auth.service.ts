import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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
    return { message: 'Login successful' };
  }

  logout(res: Response) {
    res.clearCookie('Authentication', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return { success: true } as const;
  }

  profile(user: User) {
    const { passwordHash: _passwordHash, ...result } = user;
    return result;
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findByUsername(loginDto.username);
    if (!user) return null;

    const isMatch = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isMatch) return null;
    const { passwordHash: _passwordHash, ...result } = user;
    return result;
  }
}
