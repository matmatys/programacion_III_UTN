import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ConversationController } from './conversation/conversation.controller';
import { HealthController } from './health/health.controller';
import { MessageController } from './message/message.controller';

@Module({
  controllers: [HealthController, AuthController, ConversationController, MessageController],
})
export class AppModule {}
