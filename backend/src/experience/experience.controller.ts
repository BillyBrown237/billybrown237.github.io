import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';
import { AppPermission } from '../auth/permissions.constants';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Create a new experience entry' })
  @ApiCreatedResponse({ description: 'Experience created successfully' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.ExperienceCreate)
  @Post()
  create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experienceService.create(createExperienceDto);
  }

  @ApiOperation({ summary: 'List all experience entries' })
  @ApiOkResponse({ description: 'Array of experiences' })
  @Get()
  findAll() {
    return this.experienceService.findAll();
  }

  @ApiOperation({ summary: 'Get a single experience by UUID' })
  @ApiOkResponse({ description: 'Experience details' })
  @ApiParam({ name: 'uuid', description: 'Experience UUID', type: 'string' })
  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.experienceService.findOne(uuid);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Update an experience by UUID' })
  @ApiOkResponse({ description: 'Updated experience' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.ExperienceUpdate)
  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experienceService.update(uuid, updateExperienceDto);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Delete an experience by UUID' })
  @ApiOkResponse({ description: 'Experience deleted' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.ExperienceDelete)
  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.experienceService.remove(uuid);
  }
}
