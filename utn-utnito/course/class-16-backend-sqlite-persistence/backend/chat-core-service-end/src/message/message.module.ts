import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationModule } from '../conversation/conversation.module';
import { MessageController } from './message.controller';
import { MessageEntity } from './entity/message.entity';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity]), ConversationModule],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
