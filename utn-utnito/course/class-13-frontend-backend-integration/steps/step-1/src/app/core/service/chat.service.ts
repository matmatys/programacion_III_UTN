import { Injectable } from '@angular/core';
import { Conversation } from '../model/conversation.interface';
import { Message } from '../model/message.interface';
import { MockBackendService } from './mock-backend.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private selectedConversationId: string | null = null;
  private conversationFilter = '';
  private draftMessage = '';

  constructor(private readonly mockBackendService: MockBackendService) {
    this.ensureSelectedConversation();
  }

  getConversationFilter(): string {
    return this.conversationFilter;
  }

  setConversationFilter(value: string): void {
    this.conversationFilter = value;

    if (!this.selectedConversationId) {
      return;
    }

    const filteredConversations = this.getFilteredConversations();
    const selectedConversationVisible = filteredConversations.some(
      (conversation) => conversation.id === this.selectedConversationId,
    );

    if (!selectedConversationVisible) {
      this.selectedConversationId = filteredConversations[0]?.id || null;
    }
  }

  getDraftMessage(): string {
    return this.draftMessage;
  }

  setDraftMessage(value: string): void {
    this.draftMessage = value;
  }

  getSelectedConversationId(): string | null {
    return this.selectedConversationId;
  }

  getConversations(): Conversation[] {
    return this.mockBackendService.listConversations();
  }

  getVisibleConversations(): Conversation[] {
    return this.getConversations().filter((conversation) => !conversation.archived);
  }

  getFilteredConversations(): Conversation[] {
    const normalizedFilter = this.conversationFilter.trim().toLowerCase();

    if (!normalizedFilter) {
      return this.getVisibleConversations();
    }

    return this.getVisibleConversations().filter((conversation) =>
      conversation.title.toLowerCase().includes(normalizedFilter),
    );
  }

  getActiveConversation(): Conversation | null {
    if (!this.selectedConversationId) {
      return null;
    }

    return (
      this.getConversations().find(
        (conversation) => conversation.id === this.selectedConversationId && !conversation.archived,
      ) || null
    );
  }

  getActiveConversationTitle(): string {
    return this.getActiveConversation()?.title || 'No conversation selected';
  }

  getVisibleMessages(): Message[] {
    return this.getActiveConversation()?.messages || [];
  }

  selectConversation(conversationId: string): void {
    this.selectedConversationId = conversationId;
  }

  createNewConversation(): void {
    const nextConversationIndex = this.getConversations().length + 1;
    const newConversation = this.mockBackendService.createConversation(
      `New conversation ${nextConversationIndex}`,
    );

    this.selectedConversationId = newConversation.id;
    this.conversationFilter = '';
    this.draftMessage = '';
  }

  archiveConversation(conversationId: string): void {
    this.mockBackendService.archiveConversation(conversationId);

    if (this.selectedConversationId === conversationId) {
      this.selectedConversationId = this.getFilteredConversations()[0]?.id || null;
    }
  }

  sendDraftMessage(): boolean {
    const activeConversation = this.getActiveConversation();
    const normalizedDraft = this.draftMessage.trim();

    if (!activeConversation || !normalizedDraft) {
      return false;
    }

    const result = this.mockBackendService.createMessage(activeConversation.id, normalizedDraft);

    if (!result) {
      return false;
    }

    this.draftMessage = '';
    return true;
  }

  ensureSelectedConversation(): void {
    if (this.selectedConversationId) {
      return;
    }

    this.selectedConversationId = this.getVisibleConversations()[0]?.id || null;
  }
}
