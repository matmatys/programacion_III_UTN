import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiProvider, GenerateReplyRequest } from './ai-provider.interface';
import { MockAiProvider } from './mock-ai.provider';
import { ChatGptAiProvider } from './chatgpt-ai.provider';
import { AiProviderType } from './model/ai-provider-type.enum';
import { OllamaAiProvider } from './ollama-ai.provider';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly mockAiProvider: MockAiProvider,
    private readonly chatGptAiProvider: ChatGptAiProvider,
    private readonly ollamaAiProvider: OllamaAiProvider,
  ) {}

  async generateReply(request: GenerateReplyRequest): Promise<string> {
    const provider = this.resolveProvider(
      this.configService.get<string>('AI_PROVIDER', AiProviderType.MOCK),
    );
    const fallbackMode = this.resolveProvider(
      this.configService.get<string>('AI_ON_ERROR_FALLBACK', AiProviderType.MOCK),
    );

    const selectedProvider = this.getProvider(provider);

    if (provider === AiProviderType.MOCK) {
      const rawProvider = this.configService
        .get<string>('AI_PROVIDER', AiProviderType.MOCK)
        .toLowerCase();
      if (rawProvider !== AiProviderType.MOCK) {
        this.logger.warn(`Unsupported AI_PROVIDER "${rawProvider}". Falling back to mock provider.`);
      }
    }

    try {
      return await selectedProvider.generateReply(request);
    } catch (error) {
      if (
        (provider === AiProviderType.CHATGPT || provider === AiProviderType.OLLAMA) &&
        fallbackMode === AiProviderType.MOCK
      ) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.logger.warn(
          `${provider} provider failed ("${errorMessage}"). Falling back to ${AiProviderType.MOCK} provider.`,
        );
        return this.mockAiProvider.generateReply(request);
      }

      throw error;
    }
  }

  private getProvider(provider: AiProviderType): AiProvider {
    switch (provider) {
      case AiProviderType.CHATGPT:
        return this.chatGptAiProvider;
      case AiProviderType.OLLAMA:
        return this.ollamaAiProvider;
      case AiProviderType.MOCK:
      default:
        return this.mockAiProvider;
    }
  }

  private resolveProvider(provider: string): AiProviderType {
    const normalizedProvider = provider.toLowerCase();
    switch (normalizedProvider) {
      case AiProviderType.CHATGPT:
        return AiProviderType.CHATGPT;
      case AiProviderType.OLLAMA:
        return AiProviderType.OLLAMA;
      case AiProviderType.MOCK:
      default:
        return AiProviderType.MOCK;
    }
  }
}
