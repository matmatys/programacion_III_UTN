import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  /** Builds a lightweight uptime response for smoke tests. */
  getHealthStatus() {
    return {
      service: 'class-14-auth-jwt-backend-start',
      status: 'UP',
      class: 14,
    };
  }
}
