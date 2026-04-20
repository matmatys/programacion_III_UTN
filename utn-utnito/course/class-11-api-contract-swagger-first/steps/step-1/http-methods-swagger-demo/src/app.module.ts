import { Module } from '@nestjs/common';
import { DemoMessagesController } from './demo-messages/demo-messages.controller';

@Module({
  controllers: [DemoMessagesController],
})
export class AppModule {}
