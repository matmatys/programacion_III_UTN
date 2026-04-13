import { MessageRole } from './message-role.enum';

export interface Message {
  messageId: string;
  conversationId: string;
  userId: string;
  role: MessageRole;
  content: string;
  creationDate: string;
  lastUpdate: string;
}
