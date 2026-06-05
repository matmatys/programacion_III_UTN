import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './ai.service';
import { MockAiProvider } from './mock-ai.provider';

@Module({
  imports: [ConfigModule],
  providers: [AiService, MockAiProvider],
  exports: [AiService],
})
export class AiModule {}
