import { ApiProperty } from '@nestjs/swagger';
import { AbstractBasicChatObject } from '../../basic/abstract-basic-chat-object.model';
import { MessageRole } from './message-role.enum';

export class MessageModel extends AbstractBasicChatObject {
  @ApiProperty({ example: 'msg-1' })
  messageId: string;

  @ApiProperty({ example: 'conv-1' })
  conversationId: string;

  @ApiProperty({ enum: MessageRole, example: MessageRole.USER })
  role: MessageRole;

  @ApiProperty({ example: 'Hello UTNito' })
  content: string;

  constructor(
    messageId: string,
    conversationId: string,
    role: MessageRole,
    content: string,
    createdAt: string,
    updatedAt: string,
  ) {
    super(createdAt, updatedAt);
    this.messageId = messageId;
    this.conversationId = conversationId;
    this.role = role;
    this.content = content;
  }
}
