import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageRequest {
  @ApiProperty({ example: 'Can we keep controller and service separated?' })
  content!: string;
}
