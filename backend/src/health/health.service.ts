import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  checkHealth() {
    const status = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'Keep coding the app runs',
    };
    return status;
  }
}
