import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';
import { AppPermission } from '../auth/permissions.constants';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Create a new profile' })
  @ApiCreatedResponse({ description: 'Profile created successfully' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.ProfilesCreate)
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @ApiOperation({ summary: 'List all profiles' })
  @ApiOkResponse({ description: 'Array of profiles' })
  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @ApiOperation({ summary: 'Get a profile by ID' })
  @ApiOkResponse({ description: 'Profile details' })
  @ApiParam({ name: 'id', description: 'Profile numeric ID', type: 'number' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Update a profile by ID' })
  @ApiOkResponse({ description: 'Updated profile' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.ProfilesUpdate)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(+id, updateProfileDto);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Delete a profile by ID' })
  @ApiOkResponse({ description: 'Profile deleted' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.ProfilesDelete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
}
