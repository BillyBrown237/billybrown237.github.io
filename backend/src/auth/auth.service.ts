import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userRepository.findOne({
      where: { username: registerDto.username },
    });
    if (user)
      throw new ConflictException(
        `User with username ${user.username} already exists`,
      );
    const newAdmin = this.userRepository.create(registerDto);
    return await this.userRepository.save(newAdmin);
  }

  async login(loginDto: LoginDto) {
    console.info(loginDto);
    return await `This action returns all auth`;
  }


}
