import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './ai.service';
import { MockAiProvider } from './mock-ai.provider';
import { N8nAiProvider } from './n8n-ai.provider';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [AiService, MockAiProvider, N8nAiProvider],
  exports: [AiService],
})
export class AiModule {}
