import { Injectable } from '@angular/core';
import { Conversation } from '../model/conversation.interface';
import { Message } from '../model/message.interface';
import { MockBackendService } from './mock-backend.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private readonly mockBackendService: MockBackendService) {}

  getConversations(): Conversation[] {
    return this.mockBackendService.listConversations();
  }

  getVisibleConversations(): Conversation[] {
    return this.getConversations().filter((conversation) => !conversation.archived);
  }

  getFilteredConversations(conversationFilter: string): Conversation[] {
    const normalizedFilter = conversationFilter.trim().toLowerCase();

    if (!normalizedFilter) {
      return this.getVisibleConversations();
    }

    return this.getVisibleConversations().filter((conversation) =>
      conversation.title.toLowerCase().includes(normalizedFilter),
    );
  }

  getActiveConversation(selectedConversationId: string | null): Conversation | null {
    if (!selectedConversationId) {
      return null;
    }

    return (
      this.getConversations().find(
        (conversation) => conversation.id === selectedConversationId && !conversation.archived,
      ) || null
    );
  }

  getActiveConversationTitle(selectedConversationId: string | null): string {
    return this.getActiveConversation(selectedConversationId)?.title || 'No conversation selected';
  }

  getVisibleMessages(selectedConversationId: string | null): Message[] {
    return this.getActiveConversation(selectedConversationId)?.messages || [];
  }

  createNewConversation(): Conversation {
    const nextConversationIndex = this.getConversations().length + 1;
    return this.mockBackendService.createConversation(`New conversation ${nextConversationIndex}`);
  }

  archiveConversation(conversationId: string): void {
    this.mockBackendService.archiveConversation(conversationId);
  }

  sendMessage(selectedConversationId: string | null, draftMessage: string): boolean {
    const activeConversation = this.getActiveConversation(selectedConversationId);
    const normalizedDraft = draftMessage.trim();

    if (!activeConversation || !normalizedDraft) {
      return false;
    }

    const result = this.mockBackendService.createMessage(activeConversation.id, normalizedDraft);
    return !!result;
  }

  ensureSelectedConversation(
    selectedConversationId: string | null,
    conversationFilter: string,
  ): string | null {
    const filteredConversations = this.getFilteredConversations(conversationFilter);

    if (!selectedConversationId) {
      return filteredConversations[0]?.id || null;
    }

    const selectedConversationVisible = filteredConversations.some(
      (conversation) => conversation.id === selectedConversationId,
    );

    if (!selectedConversationVisible) {
      return filteredConversations[0]?.id || null;
    }

    return selectedConversationId;
  }
}
