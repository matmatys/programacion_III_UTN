import { MessageRole } from '../message/model/message-role.enum';

export interface AiContextMessage {
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface GenerateReplyRequest {
  conversationId: string;
  conversationTitle: string;
  latestUserMessage: string;
  recentMessages: AiContextMessage[];
}

export interface AiProvider {
  generateReply(request: GenerateReplyRequest): Promise<string>;
}
