import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AiProvider, GenerateReplyRequest } from './ai-provider.interface';
import { buildAssistantMessagePrompt } from './prompt/assistant-message.prompt';

interface N8nAiResponse {
  action?: string;
  error?: boolean;
  data?: {
    assistantMessage?: string;
    errorMessage?: string;
    errorDetails?: string;
    [key: string]: unknown;
  };
  origin?: string;
}

export abstract class AbstractAiProvider implements AiProvider {
  protected readonly logger = new Logger(this.constructor.name);

  protected constructor(
    protected readonly configService: ConfigService,
    protected readonly httpService: HttpService,
  ) {}

  async generateReply(request: GenerateReplyRequest): Promise<string> {
    const webhookUrl = this.configService.get<string>(this.getWebhookUrlConfigKey(), '');
    const timeout = Number(this.configService.get<string>('AI_N8N_TIMEOUT_MS', '25000'));

    if (!webhookUrl.trim()) {
      throw new Error(`${this.getWebhookUrlConfigKey()} is not configured`);
    }

    const prompt = buildAssistantMessagePrompt(this.configService, request);
    const payload = {
      prompt,
      userMessage: request.latestUserMessage,
      context: {
        userId: request.userId,
        userDisplayName: request.userDisplayName,
        conversationId: request.conversationId,
        conversationTitle: request.conversationTitle,
      },
      ...this.buildProviderPayload(request),
    };

    const response = await firstValueFrom(
      this.httpService.post<N8nAiResponse>(webhookUrl, payload, {
        timeout: Number.isFinite(timeout) && timeout > 0 ? timeout : 25000,
      }),
    );

    const parsedResponse = response.data || {};

    if (parsedResponse.error) {
      const errorMessage = parsedResponse.data?.errorMessage || 'Unknown n8n processing error';
      const errorDetails = parsedResponse.data?.errorDetails
        ? ` | details: ${parsedResponse.data.errorDetails}`
        : '';
      throw new Error(`n8n AI workflow error (${this.getProviderName()}): ${errorMessage}${errorDetails}`);
    }

    const assistantMessage = parsedResponse.data?.assistantMessage;
    if (!assistantMessage || typeof assistantMessage !== 'string') {
      this.logger.error(`Invalid n8n response payload: ${JSON.stringify(parsedResponse)}`);
      throw new Error('Invalid n8n AI response: missing assistantMessage');
    }

    return assistantMessage.trim();
  }

  protected abstract getProviderName(): string;

  protected abstract getWebhookUrlConfigKey(): string;

  protected buildProviderPayload(_request: GenerateReplyRequest): Record<string, unknown> {
    return {};
  }
}
