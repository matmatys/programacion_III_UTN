import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AbstractController } from '../basic/abstract.controller';
import { HealthService } from './health.service';

@ApiTags('health')
@Controller('health')
export class HealthController extends AbstractController {
  constructor(private readonly healthService: HealthService) {
    super();
  }

  /** Returns a simple health check payload for the class 21 backend. */
  @Get()
  @ApiOperation({ summary: 'Health check for class 21 backend' })
  getHealth() {
    return this.createOkResponseWithMessage(this.healthService.getHealthStatus(), 'Health check OK');
  }
}
