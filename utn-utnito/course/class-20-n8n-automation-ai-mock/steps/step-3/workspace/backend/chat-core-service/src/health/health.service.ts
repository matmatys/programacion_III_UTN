import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  /** Builds a lightweight uptime response for smoke tests. */
  getHealthStatus() {
    return {
      service: 'class-20-n8n-automation-ai-mock-backend',
      status: 'UP',
      class: 19,
    };
  }
}
