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
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
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

@ApiTags('permissions')
@ApiCookieAuth('Authentication')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({ summary: 'Create a permission' })
  @ApiCreatedResponse({ description: 'Permission created successfully' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.PermissionManage)
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionService.create(createPermissionDto);
  }

  @ApiOperation({ summary: 'List all permissions' })
  @ApiOkResponse({ description: 'Array of permissions' })
  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @ApiOperation({ summary: 'Get a permission by UUID' })
  @ApiOkResponse({ description: 'Permission details' })
  @ApiParam({ name: 'uuid', description: 'Permission UUID', type: 'string' })
  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.permissionService.findOne(uuid);
  }

  @ApiOperation({ summary: 'Update a permission by UUID' })
  @ApiOkResponse({ description: 'Updated permission' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.PermissionManage)
  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update(uuid, updatePermissionDto);
  }

  @ApiOperation({ summary: 'Delete a permission by UUID' })
  @ApiOkResponse({ description: 'Permission deleted' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.PermissionManage)
  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.permissionService.remove(uuid);
  }
}
