import { Message } from './message.interface';

export interface CreateMessageResponse {
  userMessage: Message;
  assistantMessage: Message;
}
