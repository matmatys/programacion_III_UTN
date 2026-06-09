import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiProvider, GenerateReplyRequest } from './ai-provider.interface';
import { AiProviderType } from './model/ai-provider-type.enum';
import { MockAiProvider } from './mock-ai.provider';
import { N8nAiProvider } from './n8n-ai.provider';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly mockAiProvider: MockAiProvider,
    private readonly n8nAiProvider: N8nAiProvider,
  ) {}

  async generateReply(request: GenerateReplyRequest): Promise<string> {
    const providerType = this.resolveProvider(
      this.configService.get<string>('AI_PROVIDER', AiProviderType.MOCK),
    );

    return this.getProvider(providerType).generateReply(request);
  }

  private getProvider(providerType: AiProviderType): AiProvider {
    switch (providerType) {
      case AiProviderType.N8N:
        return this.n8nAiProvider;
      case AiProviderType.MOCK:
      default:
        return this.mockAiProvider;
    }
  }

  private resolveProvider(provider: string): AiProviderType {
    const normalizedProvider = provider.toLowerCase();

    switch (normalizedProvider) {
      case AiProviderType.N8N:
        return AiProviderType.N8N;
      case AiProviderType.MOCK:
        return AiProviderType.MOCK;
      default:
        this.logger.warn(`Unsupported AI_PROVIDER "${provider}". Falling back to local mock.`);
        return AiProviderType.MOCK;
    }
  }
}
