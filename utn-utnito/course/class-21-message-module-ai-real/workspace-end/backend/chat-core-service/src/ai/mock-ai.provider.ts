import { Injectable } from '@nestjs/common';
import { AiProvider, GenerateReplyRequest } from './ai-provider.interface';

@Injectable()
export class MockAiProvider implements AiProvider {
  async generateReply(request: GenerateReplyRequest): Promise<string> {
    const normalizedMessage = request.latestUserMessage.trim();

    if (!normalizedMessage) {
      return 'Escribime un mensaje para poder ayudarte con UTNito.';
    }

    return `Respuesta mock local de UTNito para "${request.conversationTitle}": ${normalizedMessage}`;
  }
}
