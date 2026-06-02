import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  /** Builds a lightweight uptime response for smoke tests. */
  getHealthStatus() {
    return {
      service: 'class-19-docker-basic-compose-backend',
      status: 'UP',
      class: 19,
    };
  }
}
