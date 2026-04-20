import { ApiProperty } from '@nestjs/swagger';
import { MessageRole } from './message-role.enum';

export class MessageModel {
  @ApiProperty({ example: 'msg-1' })
  messageId!: string;

  @ApiProperty({ example: 'conv-1' })
  conversationId!: string;

  @ApiProperty({ enum: MessageRole, example: MessageRole.USER })
  role!: MessageRole;

  @ApiProperty({ example: 'Hello UTNito' })
  content!: string;

  @ApiProperty({ example: '2026-04-19T00:00:00.000Z' })
  createdAt!: string;
}
