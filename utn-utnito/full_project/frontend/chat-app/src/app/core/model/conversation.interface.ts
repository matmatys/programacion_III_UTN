import { ConversationStatus } from './conversation-status.enum';

export interface Conversation {
  conversationId: string;
  userId: string;
  title: string;
  status: ConversationStatus;
  creationDate: string;
  lastUpdate: string;
}
