import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Patch,
  Post,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request as RequestType } from 'express';
import { User } from './entities/user.entity';
import { UserRoles } from './enum/user-role.enum';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Request() request: RequestType,
  ) {
    console.info('Request User', request.user);
    if ((request.user as User).role !== UserRoles.ADMIN) {
      throw new UnauthorizedException();
    }
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'Returns an array of users.' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({
    name: 'uuid',
    description: 'The unique identifier (UUID) of the user.',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Returns a single user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('uuid') uuid: string) {
    return this.userService.findOne(uuid);
  }

  @Get('username/:username')
  @ApiOperation({ summary: 'Retrieve a user by username' })
  @ApiParam({
    name: 'username',
    description: 'The username of the user.',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Returns a single user.' })
  findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update an existing user by ID' })
  @ApiParam({
    name: 'uuid',
    description: 'The unique identifier (UUID) of the user.',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'uuid',
    description: 'The unique identifier (UUID) of the user.',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('uuid') uuid: string) {
    return this.userService.remove(uuid);
  }
}
