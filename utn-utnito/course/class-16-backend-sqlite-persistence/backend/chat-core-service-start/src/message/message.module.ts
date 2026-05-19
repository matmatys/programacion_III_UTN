import { Module } from '@nestjs/common';
import { ConversationModule } from '../conversation/conversation.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [ConversationModule],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
