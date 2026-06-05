import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractBasicChatEntity {
  // TypeORM decorator: auto-fills creation timestamp when a row is inserted.
  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  // TypeORM decorator: auto-updates timestamp every time the row changes.
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt!: Date;
}
