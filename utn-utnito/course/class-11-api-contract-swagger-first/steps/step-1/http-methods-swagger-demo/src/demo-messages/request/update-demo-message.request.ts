import { ApiProperty } from '@nestjs/swagger';

export class UpdateDemoMessageRequest {
  @ApiProperty({ example: 'Texto corregido', required: false })
  content?: string;

  @ApiProperty({ example: 'Matias', required: false })
  name?: string;
}
