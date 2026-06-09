import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiProvider, GenerateReplyRequest } from './ai-provider.interface';
import { ChatGptAiProvider } from './chatgpt-ai.provider';
import { AiProviderType } from './model/ai-provider-type.enum';
import { MockAiProvider } from './mock-ai.provider';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly mockAiProvider: MockAiProvider,
    private readonly chatGptAiProvider: ChatGptAiProvider,
  ) {}

  async generateReply(request: GenerateReplyRequest): Promise<string> {
    const providerType = this.resolveProvider(
      this.configService.get<string>('AI_PROVIDER', AiProviderType.MOCK),
      'AI_PROVIDER',
    );
    const fallbackProviderType = this.resolveProvider(
      this.configService.get<string>('AI_ON_ERROR_FALLBACK', AiProviderType.MOCK),
      'AI_ON_ERROR_FALLBACK',
    );

    try {
      return await this.getProvider(providerType).generateReply(request);
    } catch (error) {
      if (providerType === AiProviderType.CHATGPT && fallbackProviderType === AiProviderType.MOCK) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.logger.warn(
          `${providerType} provider failed ("${errorMessage}"). Falling back to ${AiProviderType.MOCK} provider.`,
        );
        return this.mockAiProvider.generateReply(request);
      }

      throw error;
    }
  }

  private getProvider(providerType: AiProviderType): AiProvider {
    switch (providerType) {
      case AiProviderType.CHATGPT:
        return this.chatGptAiProvider;
      case AiProviderType.MOCK:
      default:
        return this.mockAiProvider;
    }
  }

  private resolveProvider(provider: string, configKey: string): AiProviderType {
    const normalizedProvider = provider.toLowerCase();

    switch (normalizedProvider) {
      case AiProviderType.CHATGPT:
        return AiProviderType.CHATGPT;
      case AiProviderType.MOCK:
        return AiProviderType.MOCK;
      default:
        this.logger.warn(`Unsupported ${configKey} "${provider}". Falling back to local mock.`);
        return AiProviderType.MOCK;
    }
  }
}
