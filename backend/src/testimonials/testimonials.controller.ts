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
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
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

@ApiTags('testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Create a new testimonial' })
  @ApiCreatedResponse({ description: 'Testimonial created successfully' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.TestimonialsCreate)
  @Post()
  create(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createTestimonialDto);
  }

  @ApiOperation({ summary: 'List all testimonials' })
  @ApiOkResponse({ description: 'Array of testimonials' })
  @Get()
  findAll() {
    return this.testimonialsService.findAll();
  }

  @ApiOperation({ summary: 'Get a testimonial by UUID' })
  @ApiOkResponse({ description: 'Testimonial details' })
  @ApiParam({ name: 'uuid', description: 'Testimonial UUID', type: 'string' })
  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.testimonialsService.findOne(uuid);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Update a testimonial by UUID' })
  @ApiOkResponse({ description: 'Updated testimonial' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.TestimonialsUpdate)
  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ) {
    return this.testimonialsService.update(uuid, updateTestimonialDto);
  }

  @ApiCookieAuth('Authentication')
  @ApiOperation({ summary: 'Delete a testimonial by UUID' })
  @ApiOkResponse({ description: 'Testimonial deleted' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(AppPermission.TestimonialsDelete)
  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.testimonialsService.remove(uuid);
  }
}
