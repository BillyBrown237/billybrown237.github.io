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
import { UserRoles } from '../user/enum/user-role.enum';
import type { Request as RequestType } from 'express';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

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

  @UseGuards(LocalAuthGuard)
  @Post('login/admin')
  login(@Request() request: RequestType) {
    return this.authService.login(request.user as User);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout/admin')
  logout(@Request() request: RequestType) {
    return request.logout((err) => {
      if (err) {
        throw err;
      }
      // handle successful logout
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/admin')
  async profile(@Request() req: RequestType) {
    return await this.authService.findOne(req.user as User);
  }
}
