import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { GenerateReplyRequest } from './ai-provider.interface';
import { AbstractAiProvider } from './abstract-ai.provider';
import { AiProviderType } from './model/ai-provider-type.enum';

@Injectable()
export class OllamaAiProvider extends AbstractAiProvider {
  constructor(
    configService: ConfigService,
    httpService: HttpService,
  ) {
    super(configService, httpService);
  }

  protected getProviderName(): string {
    return AiProviderType.OLLAMA;
  }

  protected getWebhookUrlConfigKey(): string {
    return 'AI_N8N_OLLAMA_WEBHOOK_URL';
  }

  protected buildProviderPayload(_request: GenerateReplyRequest): Record<string, unknown> {
    return {
      ollamaModel: this.configService.get<string>('AI_OLLAMA_MODEL', 'llama3.2'),
    };
  }
}
