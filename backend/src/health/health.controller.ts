import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiOkResponse({ description: 'Returns service health status' })
  @Get()
  check() {
    return this.healthService.checkHealth();
  }
}
