import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './ai.service';
import { ChatGptAiProvider } from './chatgpt-ai.provider';
import { MockAiProvider } from './mock-ai.provider';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [AiService, MockAiProvider, ChatGptAiProvider],
  exports: [AiService],
})
export class AiModule {}
