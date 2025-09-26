import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TemporaryTokensService } from './temporary-tokens.service';
import { CreateTemporaryTokenDto } from './dto/create-temporary-token.dto';
import { UpdateTemporaryTokenDto } from './dto/update-temporary-token.dto';
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

@ApiTags('temporary-tokens')
@ApiCookieAuth('Authentication')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('temporary-tokens')
export class TemporaryTokensController {
  constructor(
    private readonly temporaryTokensService: TemporaryTokensService,
  ) {}

  @ApiOperation({
    summary: 'Create a one-time temporary token with permissions',
  })
  @ApiCreatedResponse({ description: 'Temporary token created successfully' })
  @Permissions(AppPermission.PermissionManage)
  @Post()
  async create(@Body() createTemporaryTokenDto: CreateTemporaryTokenDto) {
    return await this.temporaryTokensService.create(createTemporaryTokenDto);
  }

  @ApiOperation({ summary: 'List all temporary tokens' })
  @ApiOkResponse({ description: 'Array of temporary tokens' })
  @Permissions(AppPermission.PermissionManage)
  @Get()
  async findAll() {
    return await this.temporaryTokensService.findAll();
  }

  @ApiOperation({ summary: 'Get a temporary token by UUID' })
  @ApiOkResponse({ description: 'Temporary token details' })
  @ApiParam({
    name: 'uuid',
    description: 'Temporary token UUID',
    type: 'string',
  })
  @Permissions(AppPermission.PermissionManage)
  @Get(':uuid')
  async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return await this.temporaryTokensService.findOne(uuid);
  }

  @ApiOperation({ summary: 'Patch update a temporary token by UUID' })
  @ApiOkResponse({ description: 'Updated temporary token' })
  @Permissions(AppPermission.PermissionManage)
  @Patch(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateTemporaryTokenDto: UpdateTemporaryTokenDto,
  ) {
    return await this.temporaryTokensService.patchUpdate(
      uuid,
      updateTemporaryTokenDto,
    );
  }

  @ApiOperation({ summary: 'Replace a temporary token by UUID' })
  @ApiOkResponse({ description: 'Replaced temporary token' })
  @Permissions(AppPermission.PermissionManage)
  @Put(':uuid')
  async replace(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateTemporaryTokenDto: UpdateTemporaryTokenDto,
  ) {
    return await this.temporaryTokensService.putUpdate(
      uuid,
      updateTemporaryTokenDto,
    );
  }

  @ApiOperation({ summary: 'Delete a temporary token by UUID' })
  @ApiOkResponse({ description: 'Temporary token deleted' })
  @Permissions(AppPermission.PermissionManage)
  @Delete(':uuid')
  async remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return await this.temporaryTokensService.remove(uuid);
  }
}
