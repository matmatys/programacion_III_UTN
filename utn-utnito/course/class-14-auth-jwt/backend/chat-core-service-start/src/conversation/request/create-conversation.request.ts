import { ApiProperty } from '@nestjs/swagger';

export class CreateConversationRequest {
  @ApiProperty({ example: 'New architecture notes' })
  title!: string;
}
