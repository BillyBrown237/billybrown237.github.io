import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Admin login (sets Authentication cookie)' })
  @ApiBody({
    type: () => LoginDto,
  })
  @ApiOkResponse({
    description: 'Login successful; JWT set in Authentication cookie',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Admin logout (clears Authentication cookie)' })
  @ApiOkResponse({ description: 'Logout successful' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({ description: 'Returns the user profile' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  profile(@Req() req: Request) {
    return this.authService.profile(req.user as User);
  }
}
