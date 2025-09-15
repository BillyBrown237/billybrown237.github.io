import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  checkHealth() {
    const status = {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
    return status;
  }
}
