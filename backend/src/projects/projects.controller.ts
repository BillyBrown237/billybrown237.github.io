import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';
import { AppPermission } from '../auth/permissions.constants';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Create a new project' })
  @ApiCreatedResponse({ description: 'Project created successfully' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.ProjectsCreate)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @ApiOperation({ summary: 'List all projects' })
  @ApiOkResponse({ description: 'Array of projects' })
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @ApiOperation({ summary: 'Get a project by UUID' })
  @ApiOkResponse({ description: 'Project details' })
  @ApiParam({ name: 'uuid', description: 'Project UUID', type: 'string' })
  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.projectsService.findOne(uuid);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Update a project by UUID' })
  @ApiOkResponse({ description: 'Updated project' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.ProjectsUpdate)
  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(uuid, updateProjectDto);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Delete a project by UUID' })
  @ApiOkResponse({ description: 'Project deleted' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.ProjectsDelete)
  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.projectsService.remove(uuid);
  }
}
