import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AbstractAiProvider } from './abstract-ai.provider';
import { AiProviderType } from './model/ai-provider-type.enum';

@Injectable()
export class ChatGptAiProvider extends AbstractAiProvider {
  constructor(
    configService: ConfigService,
    httpService: HttpService,
  ) {
    super(configService, httpService);
  }

  protected getProviderName(): string {
    return AiProviderType.CHATGPT;
  }

  protected getWebhookUrlConfigKey(): string {
    return 'AI_N8N_CHATGPT_WEBHOOK_URL';
  }
}
