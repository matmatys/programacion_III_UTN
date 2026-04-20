import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ConversationController } from './conversation/conversation.controller';
import { HealthController } from './health/health.controller';

@Module({
  controllers: [HealthController, AuthController, ConversationController],
})
export class AppModule {}
