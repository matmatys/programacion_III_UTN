import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  /** Builds a lightweight uptime response for smoke tests. */
  getHealthStatus() {
    return {
      service: 'class-15-auth-jwt-frontend-integration-backend',
      status: 'UP',
      class: 14,
    };
  }
}
