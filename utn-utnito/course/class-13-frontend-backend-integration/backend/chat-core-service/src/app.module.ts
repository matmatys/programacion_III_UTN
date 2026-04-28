import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConversationModule } from './conversation/conversation.module';
import { HealthModule } from './health/health.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [HealthModule, AuthModule, ConversationModule, MessageModule],
})
export class AppModule {}
