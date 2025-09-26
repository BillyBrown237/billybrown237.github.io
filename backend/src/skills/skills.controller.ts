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
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
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

@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Create a new skill' })
  @ApiCreatedResponse({ description: 'Skill created successfully' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.SkillsCreate)
  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @ApiOperation({ summary: 'List all skills' })
  @ApiOkResponse({ description: 'Array of skills' })
  @Get()
  findAll() {
    return this.skillsService.findAll();
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Get a skill by UUID' })
  @ApiOkResponse({ description: 'Skill details' })
  @ApiParam({ name: 'uuid', description: 'Skill UUID', type: 'string' })
  @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.skillsService.findOne(uuid);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Update a skill by UUID' })
  @ApiOkResponse({ description: 'Updated skill' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.SkillsUpdate)
  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return this.skillsService.update(uuid, updateSkillDto);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Delete a skill by UUID' })
  @ApiOkResponse({ description: 'Skill deleted' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.SkillsDelete)
  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.skillsService.remove(uuid);
  }
}
