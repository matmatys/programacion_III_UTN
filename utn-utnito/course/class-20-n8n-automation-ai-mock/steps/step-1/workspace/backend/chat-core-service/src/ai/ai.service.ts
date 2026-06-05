import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiProvider, GenerateReplyRequest } from './ai-provider.interface';
import { AiProviderType } from './model/ai-provider-type.enum';
import { MockAiProvider } from './mock-ai.provider';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly mockAiProvider: MockAiProvider,
  ) {}

  async generateReply(request: GenerateReplyRequest): Promise<string> {
    const providerType = this.resolveProvider(
      this.configService.get<string>('AI_PROVIDER', AiProviderType.MOCK),
    );

    return this.getProvider(providerType).generateReply(request);
  }

  private getProvider(providerType: AiProviderType): AiProvider {
    switch (providerType) {
      case AiProviderType.MOCK:
      default:
        return this.mockAiProvider;
    }
  }

  private resolveProvider(provider: string): AiProviderType {
    const normalizedProvider = provider.toLowerCase();

    if (normalizedProvider !== AiProviderType.MOCK) {
      this.logger.warn(`Unsupported AI_PROVIDER "${provider}". Falling back to local mock.`);
    }

    return AiProviderType.MOCK;
  }
}
