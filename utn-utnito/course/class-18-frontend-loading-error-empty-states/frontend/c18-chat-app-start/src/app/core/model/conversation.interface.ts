import { Message } from './message.interface';

export interface Conversation {
  id: string;
  title: string;
  archived: boolean;
  messages: Message[];
}
