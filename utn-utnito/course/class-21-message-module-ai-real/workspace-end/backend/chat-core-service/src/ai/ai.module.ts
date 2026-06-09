import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './ai.service';
import { ChatGptAiProvider } from './chatgpt-ai.provider';
import { MockAiProvider } from './mock-ai.provider';
import { OllamaAiProvider } from './ollama-ai.provider';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [AiService, MockAiProvider, ChatGptAiProvider, OllamaAiProvider],
  exports: [AiService],
})
export class AiModule {}
