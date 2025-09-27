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
import { CertificationsService } from './certifications.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
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

@ApiTags('certifications')
@Controller('certifications')
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Create a new certification' })
  @ApiCreatedResponse({ description: 'Certification created successfully' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.CertificationsCreate)
  @Post()
  create(@Body() createCertificationDto: CreateCertificationDto) {
    return this.certificationsService.create(createCertificationDto);
  }

  @ApiOperation({ summary: 'List all certifications' })
  @ApiOkResponse({ description: 'Array of certifications' })
  @Get()
  findAll() {
    return this.certificationsService.findAll();
  }

  @ApiOperation({ summary: 'Get a certification by UUID' })
  @ApiOkResponse({ description: 'Certification details' })
  @ApiParam({ name: 'id', description: 'Certification UUID', type: 'string' })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.certificationsService.findOne(id);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Update a certification by UUID' })
  @ApiOkResponse({ description: 'Updated certification' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.CertificationsUpdate)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCertificationDto: UpdateCertificationDto,
  ) {
    return this.certificationsService.update(id, updateCertificationDto);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Delete a certification by UUID' })
  @ApiOkResponse({ description: 'Certification deleted' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.CertificationsDelete)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.certificationsService.remove(id);
  }
}
