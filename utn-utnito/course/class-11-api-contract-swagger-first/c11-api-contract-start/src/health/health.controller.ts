import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check for class 11 backend' })
  getHealth() {
    return {
      success: true,
      message: 'Class 11 API is running',
      class: 11,
      serverTime: new Date().toISOString(),
    };
  }
}
