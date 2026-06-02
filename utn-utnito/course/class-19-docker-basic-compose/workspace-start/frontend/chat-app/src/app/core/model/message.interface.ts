import { MessageRole } from './message-role.enum';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
}
