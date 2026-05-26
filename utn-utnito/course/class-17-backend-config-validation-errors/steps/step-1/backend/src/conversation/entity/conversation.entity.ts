import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AbstractBasicChatEntity } from '../../basic/abstract-basic-chat-entity';
import { ConversationStatus } from '../model/conversation-status.enum';

// TypeORM decorator: maps this class to the "conversations" table.
@Entity({ name: 'conversations' })
export class ConversationEntity extends AbstractBasicChatEntity {
  // TypeORM decorator: marks the primary key column for each conversation row.
  @PrimaryColumn({ type: 'varchar', length: 64 })
  conversationId!: string;

  // TypeORM decorator: maps the conversation title column.
  @Column({ type: 'varchar', length: 120 })
  title!: string;

  // TypeORM decorator: stores conversation lifecycle state in the DB.
  @Column({ type: 'varchar', length: 16, default: ConversationStatus.INACTIVE })
  status!: ConversationStatus;
}
