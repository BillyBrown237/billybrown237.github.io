import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
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
