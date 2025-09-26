import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserRoles } from '../user/enum/user-role.enum';
import type { Request, Response } from 'express';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { TempLoginDto } from './dto/temp-login.dto';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
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

  @ApiOperation({ summary: 'Register a new admin account' })
  @ApiBody({
    type: () => RegisterDto,
  })
  @ApiCreatedResponse({ description: 'Admin registered successfully' })
  @Post('register/admin')
  async register(@Body() registerDto: RegisterDto) {
    const userPayload = {
      ...registerDto,
      role: UserRoles.ADMIN,
    };
    return await this.authService.register(userPayload);
  }

  @ApiOperation({ summary: 'Admin login (sets Authentication cookie)' })
  @ApiBody({
    type: () => LoginDto,
  })
  @ApiOkResponse({
    description: 'Login successful; JWT set in Authentication cookie',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @UseGuards(LocalAuthGuard)
  @Post('login/admin')
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
  @Post('logout/admin')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Authentication', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return { success: true } as const;
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Get current admin profile' })
  @ApiOkResponse({ description: 'Returns the authenticated admin user' })
  @UseGuards(JwtAuthGuard)
  @Get('profile/admin')
  async profile(@Req() req: Request) {
    return await this.authService.findOne(req.user as User);
  }

  @ApiOperation({
    summary:
      'Temporary login using a one-time token (sets Authentication cookie)',
  })
  @ApiBody({
    type: () => TempLoginDto,
  })
  @ApiOkResponse({
    description: 'Temporary login successful; JWT set in Authentication cookie',
  })
  @Post('temp-login')
  async tempLogin(
    @Body() dto: TempLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.tempLogin(dto.token, response);
  }
}
