import { DemoConversationStatus } from './demo-conversation-status.enum';

export interface DemoConversation {
  conversationId: string;
  title: string;
  text: string;
  status: DemoConversationStatus;
}
