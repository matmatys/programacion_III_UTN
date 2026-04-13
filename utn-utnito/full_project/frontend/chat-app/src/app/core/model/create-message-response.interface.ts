import { Message } from './message.interface';

export interface CreateMessageResponse {
  conversationId: string;
  userMessage: Message;
  assistantMessage: Message;
}
