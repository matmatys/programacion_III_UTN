import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '../basic/response-message.model';
import { ResponseObject } from '../basic/response-object.model';

@ApiTags('health')
@Controller('health')
export class HealthController {
  /** Returns a simple health check response for the API. */
  @Get()
  @ApiOperation({ summary: 'Health check for class 11 backend' })
  getHealth(): ResponseObject<{ service: string; status: string }> {
    return new ResponseObject(
      true,
      new ResponseMessage('0000', 'Health check OK'),
      new Date().toISOString(),
      {
        service: 'class-11-api-contract',
        status: 'UP',
      },
    );
  }
}
