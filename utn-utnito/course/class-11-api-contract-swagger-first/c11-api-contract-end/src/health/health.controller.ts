import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AbstractController } from '../basic/abstract.controller';

@ApiTags('health')
@Controller('health')
export class HealthController extends AbstractController {
  /** Returns a simple health check response for the API. */
  @Get()
  @ApiOperation({ summary: 'Health check for class 11 backend' })
  getHealth() {
    return this.createOkResponseWithMessage(
      {
        service: 'class-11-api-contract',
        status: 'UP',
      },
      'Health check OK',
    );
  }
}
