import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { AbstractBasicChatEntity } from '../../basic/abstract-basic-chat-entity';
import { MessageRole } from '../model/message-role.enum';

// TypeORM decorator: maps this class to the "messages" table.
@Entity({ name: 'messages' })
// TypeORM decorator: creates an index for faster queries by conversation and creation time.
@Index('idx_messages_conversation_created', ['conversationId', 'createdAt'])
export class MessageEntity extends AbstractBasicChatEntity {
  // TypeORM decorator: marks the primary key of each message row.
  @PrimaryColumn({ type: 'varchar', length: 64 })
  messageId!: string;

  // TypeORM decorator: stores the owning conversation id.
  @Column({ type: 'varchar', length: 64 })
  conversationId!: string;

  // TypeORM decorator: stores whether the message comes from user or assistant.
  @Column({ type: 'varchar', length: 16 })
  role!: MessageRole;

  // TypeORM decorator: stores the full message text content.
  @Column({ type: 'text' })
  content!: string;
}
