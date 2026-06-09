import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  /** Builds a lightweight uptime response for smoke tests. */
  getHealthStatus() {
    return {
      service: 'class-21-message-module-ai-real-backend',
      status: 'UP',
      class: 21,
    };
  }
}
