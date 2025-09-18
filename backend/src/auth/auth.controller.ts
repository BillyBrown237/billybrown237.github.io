import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRoles } from '../user/enum/user-role.enum';
import type { Request as RequestType } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/admin')
  async register(@Body() registerDto: RegisterDto) {
    const userPayload = {
      ...registerDto,
      role: UserRoles.ADMIN,
    };
    return await this.authService.register(userPayload);
  }

  @Post('login/admin')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/admin')
  profile(@Request() req: RequestType) {
    return req.user;
  }
}
