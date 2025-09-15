import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  register(registerDto: RegisterDto) {
    console.info(registerDto);
    return 'This action adds a new auth';
  }

  login(loginDto: LoginDto) {
    console.info(loginDto);
    return `This action returns all auth`;
  }
}
