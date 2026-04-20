import { ApiProperty } from '@nestjs/swagger';
import { ConversationStatus } from './conversation-status.enum';

export class ConversationModel {
  @ApiProperty({ example: 'conv-1' })
  conversationId!: string;

  @ApiProperty({ example: 'Final project planning' })
  title!: string;

  @ApiProperty({ enum: ConversationStatus, example: ConversationStatus.ACTIVE })
  status!: ConversationStatus;

  @ApiProperty({ example: '2026-04-19T00:00:00.000Z' })
  updatedAt!: string;
}
