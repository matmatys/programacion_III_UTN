import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageRequest {
  @ApiProperty({ example: 'How do I design REST endpoints?' })
  content!: string;
}
