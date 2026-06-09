import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AiProvider, GenerateReplyRequest } from './ai-provider.interface';
import { N8nAiResponse } from './n8n-ai-response.interface';
import { buildAssistantMessagePrompt } from './prompt/assistant-message.prompt';

@Injectable()
export class N8nAiProvider implements AiProvider {
  private readonly logger = new Logger(N8nAiProvider.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async generateReply(request: GenerateReplyRequest): Promise<string> {
    const webhookUrl = this.configService.get<string>('AI_N8N_WEBHOOK_URL', '');
    const timeout = Number(this.configService.get<string>('AI_N8N_TIMEOUT_MS', '10000'));

    if (!webhookUrl.trim()) {
      throw new Error('AI_N8N_WEBHOOK_URL is not configured');
    }

    const prompt = buildAssistantMessagePrompt(this.configService, request);

    const response = await firstValueFrom(
      this.httpService.post<N8nAiResponse>(
        webhookUrl,
        {
          action: 'prompt_message_request',
          prompt,
          userMessage: request.latestUserMessage,
          context: {
            userId: request.userId,
            userDisplayName: request.userDisplayName,
            conversationId: request.conversationId,
            conversationTitle: request.conversationTitle,
          },
          recentMessages: request.recentMessages,
        },
        {
          timeout: Number.isFinite(timeout) && timeout > 0 ? timeout : 10000,
        },
      ),
    );

    const payload = response.data || {};

    if (payload.error) {
      const errorMessage = payload.data?.errorMessage || 'Unknown n8n workflow error';
      const errorDetails = payload.data?.errorDetails ? ` | details: ${payload.data.errorDetails}` : '';
      throw new Error(`n8n workflow error: ${errorMessage}${errorDetails}`);
    }

    const assistantMessage = payload.data?.assistantMessage;

    if (!assistantMessage || typeof assistantMessage !== 'string') {
      this.logger.error(`Invalid n8n response payload: ${JSON.stringify(payload)}`);
      throw new Error('Invalid n8n response: data.assistantMessage is required');
    }

    return assistantMessage.trim();
  }
}
