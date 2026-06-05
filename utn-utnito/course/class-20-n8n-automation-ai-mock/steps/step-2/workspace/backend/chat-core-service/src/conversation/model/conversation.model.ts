import { ApiProperty } from '@nestjs/swagger';
import { AbstractBasicChatObject } from '../../basic/abstract-basic-chat-object.model';
import { ConversationEntity } from '../entity/conversation.entity';
import { ConversationStatus } from './conversation-status.enum';

export class ConversationModel extends AbstractBasicChatObject {
  @ApiProperty({ example: 'conv-1' })
  conversationId: string;

  @ApiProperty({ example: 'Final project planning' })
  title: string;

  @ApiProperty({ enum: ConversationStatus, example: ConversationStatus.ACTIVE })
  status: ConversationStatus;

  constructor(
    conversationId: string,
    title: string,
    status: ConversationStatus,
    createdAt: string,
    updatedAt: string,
  ) {
    super(createdAt, updatedAt);
    this.conversationId = conversationId;
    this.title = title;
    this.status = status;
  }

  // Converts a persistence entity into the API model returned by controllers.
  static fromEntityToModel(entity: ConversationEntity): ConversationModel {
    return new ConversationModel(
      entity.conversationId,
      entity.title,
      entity.status,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }
}
