import { Injectable } from '@angular/core';
import { Conversation } from '../model/conversation.interface';
import { Message } from '../model/message.interface';
import { MessageRole } from '../model/message-role.enum';

@Injectable({
  providedIn: 'root',
})
export class MockBackendService {
  private messageCounter = 3;
  private conversationCounter = 3;

  private conversations: Conversation[] = [
    {
      id: 'conv-1',
      title: 'Final project planning',
      archived: false,
      messages: [
        { id: 'm-1', role: MessageRole.ASSISTANT, content: 'Hi! Ready to review today\'s class goals?' },
        { id: 'm-2', role: MessageRole.USER, content: 'Yes, show me the checkpoint for class 8.' },
      ],
    },
    {
      id: 'conv-2',
      title: 'REST endpoint questions',
      archived: false,
      messages: [{ id: 'm-3', role: MessageRole.ASSISTANT, content: 'Ask me anything about API design.' }],
    },
    {
      id: 'conv-3',
      title: 'Docker setup help',
      archived: false,
      messages: [],
    },
  ];

  listConversations(): Conversation[] {
    return this.conversations;
  }

  createConversation(title: string): Conversation {
    this.conversationCounter += 1;

    const newConversation: Conversation = {
      id: `conv-${this.conversationCounter}`,
      title,
      archived: false,
      messages: [
        {
          id: this.buildMessageId(),
          role: MessageRole.ASSISTANT,
          content: 'New chat created. Ask me anything.',
        },
      ],
    };

    // unshift adds at the beginning of the list; push adds at the end.
    this.conversations.unshift(newConversation);

    return newConversation;
  }

  archiveConversation(conversationId: string): Conversation | null {
    const conversation = this.conversations.find((item) => item.id === conversationId && !item.archived);

    if (!conversation) {
      return null;
    }

    conversation.archived = true;
    return conversation;
  }

  createMessage(conversationId: string, content: string): { userMessage: Message; assistantMessage: Message } | null {
    const conversation = this.conversations.find((item) => item.id === conversationId && !item.archived);

    if (!conversation) {
      return null;
    }

    const normalizedContent = content.trim();
    if (!normalizedContent) {
      return null;
    }

    const userMessage: Message = {
      id: this.buildMessageId(),
      role: MessageRole.USER,
      content: normalizedContent,
    };

    const assistantMessage: Message = {
      id: this.buildMessageId(),
      role: MessageRole.ASSISTANT,
      content: `Mock reply: I received "${normalizedContent}".`,
    };

    conversation.messages.push(userMessage, assistantMessage);

    return { userMessage, assistantMessage };
  }

  private buildMessageId(): string {
    this.messageCounter += 1;
    return `m-${this.messageCounter}`;
  }
}
