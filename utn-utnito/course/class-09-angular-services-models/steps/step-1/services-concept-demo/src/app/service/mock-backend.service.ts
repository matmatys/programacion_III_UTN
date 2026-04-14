import { Injectable } from '@angular/core';
import { DemoConversation } from '../model/demo-conversation.interface';
import { DemoConversationStatus } from '../model/demo-conversation-status.enum';
import { DemoResponseObject } from '../model/demo-response-object.interface';

@Injectable({
  providedIn: 'root',
})
export class MockBackendService {
  private conversationCounter = 3;

  private conversations: DemoConversation[] = [
    {
      conversationId: 'conv-1',
      title: 'Planning',
      text: 'Review class 9 goals before practice.',
      status: DemoConversationStatus.ACTIVE,
    },
    {
      conversationId: 'conv-2',
      title: 'REST doubts',
      text: 'Need examples for endpoint naming.',
      status: DemoConversationStatus.ACTIVE,
    },
    {
      conversationId: 'conv-3',
      title: 'Old notes',
      text: 'Previous semester reminders.',
      status: DemoConversationStatus.ARCHIVED,
    },
  ];

  syncConversationsFromBackend(): void {
    //Simulates backend call
    const response = this.listConversations();
    this.conversations = response.data;
  }

  getActiveConversations(): DemoConversation[] {
    return this.conversations.filter(
      (conversation) => conversation.status === DemoConversationStatus.ACTIVE,
    );
  }

  getArchivedConversations(): DemoConversation[] {
    return this.conversations.filter(
      (conversation) => conversation.status === DemoConversationStatus.ARCHIVED,
    );
  }

  listConversations(): DemoResponseObject<DemoConversation[]> {
    return this.buildOkResponse<DemoConversation[]>(this.conversations);
  }

  createConversation(title: string, text: string): void {
    const normalizedTitle = title.trim();
    const normalizedText = text.trim();

    if (!normalizedTitle || !normalizedText) {
      return;
    }

    this.conversationCounter += 1;

    const newConversation: DemoConversation = {
      conversationId: `conv-${this.conversationCounter}`,
      title: normalizedTitle,
      text: normalizedText,
      status: DemoConversationStatus.ACTIVE,
    };

    // unshift adds at the beginning of the list; push adds at the end.
    this.conversations.unshift(newConversation);
  }

  toggleConversationArchived(conversationId: string): void {
    const conversation = this.conversations.find((item) => item.conversationId === conversationId);

    if (!conversation) {
      return;
    }

    conversation.status =
      conversation.status === DemoConversationStatus.ACTIVE
        ? DemoConversationStatus.ARCHIVED
        : DemoConversationStatus.ACTIVE;
  }

  private buildOkResponse<T>(data: T, message = 'OK'): DemoResponseObject<T> {
    return {
      serverTime: new Date().toISOString(),
      success: true,
      responseMessage: {
        messageCode: '0000',
        message,
      },
      data,
    };
  }
}
