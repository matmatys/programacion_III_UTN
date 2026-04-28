import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealthStatus() {
    return {
      service: 'class-12-backend-mock',
      status: 'UP',
      class: 12,
    };
  }
}
