import { Injectable } from '@angular/core';
import { map, Observable, of, tap, throwError } from 'rxjs';
import { Conversation } from '../model/conversation.interface';
import { CreateMessageResponse } from '../model/create-message-response.interface';
import { Message } from '../model/message.interface';
import { ChatApiService } from './chat-api.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private selectedConversationId: string | null = null;
  private conversationFilter = '';
  private draftMessage = '';

  private conversations: Conversation[] = [];
  private readonly messagesByConversationId: Record<string, Message[]> = {};

  constructor(private readonly chatApiService: ChatApiService) {}

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
    return this.conversations;
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
    if (!this.selectedConversationId) {
      return [];
    }

    return this.messagesByConversationId[this.selectedConversationId] || [];
  }

  loadConversations(): Observable<Conversation[]> {
    return this.chatApiService.listConversations().pipe(
      tap((conversations) => {
        this.conversations = conversations;
        this.ensureSelectedConversation();
      }),
    );
  }

  loadMessages(conversationId: string): Observable<Message[]> {
    const cachedMessages = this.messagesByConversationId[conversationId];

    if (cachedMessages) {
      return of(cachedMessages);
    }

    return this.chatApiService.listMessages(conversationId).pipe(
      tap((messages) => {
        this.messagesByConversationId[conversationId] = messages;
      }),
    );
  }

  selectConversation(conversationId: string): void {
    this.selectedConversationId = conversationId;
  }

  createNewConversation(): Observable<Conversation> {
    const nextConversationIndex = this.getConversations().length + 1;

    return this.chatApiService.createConversation(`New conversation ${nextConversationIndex}`).pipe(
      tap((conversation) => {
        this.conversations.unshift(conversation);
        this.selectedConversationId = conversation.id;
        this.messagesByConversationId[conversation.id] = [];
        this.conversationFilter = '';
        this.draftMessage = '';
      }),
    );
  }

  activateConversation(conversationId: string): Observable<Conversation> {
    return this.chatApiService.activateConversation(conversationId).pipe(
      tap((activeConversation) => {
        this.conversations = this.conversations.map((conversation) => {
          if (conversation.id === activeConversation.id) {
            return { ...conversation, archived: activeConversation.archived };
          }

          return conversation;
        });
      }),
    );
  }

  archiveConversation(conversationId: string): Observable<Conversation> {
    return this.chatApiService.archiveConversation(conversationId).pipe(
      tap((archivedConversation) => {
        this.conversations = this.conversations.map((conversation) => {
          if (conversation.id !== archivedConversation.id) {
            return conversation;
          }

          return { ...conversation, archived: true };
        });

        if (this.selectedConversationId === conversationId) {
          this.selectedConversationId = this.getFilteredConversations()[0]?.id || null;
        }
      }),
    );
  }

  sendDraftMessage(): Observable<CreateMessageResponse> {
    const activeConversation = this.getActiveConversation();
    const normalizedDraft = this.draftMessage.trim();

    if (!activeConversation || !normalizedDraft) {
      return throwError(
        () => new Error('Message cannot be empty or sent without an active conversation.'),
      );
    }

    return this.chatApiService.createMessage(activeConversation.id, normalizedDraft).pipe(
      tap((response) => {
        const conversationMessages = this.messagesByConversationId[activeConversation.id] || [];

        if (!this.messagesByConversationId[activeConversation.id]) {
          this.messagesByConversationId[activeConversation.id] = conversationMessages;
        }

        conversationMessages.push(response.userMessage);
        conversationMessages.push(response.assistantMessage);

        this.draftMessage = '';
      }),
    );
  }

  ensureSelectedConversation(): void {
    if (this.selectedConversationId) {
      return;
    }

    this.selectedConversationId = this.getVisibleConversations()[0]?.id || null;
  }

  clearConversationCache(conversationId: string): void {
    delete this.messagesByConversationId[conversationId];
  }

  preloadMessages(conversationId: string, messages: Message[]): void {
    this.messagesByConversationId[conversationId] = messages;
  }

  reloadMessagesForConversation(conversationId: string): Observable<Message[]> {
    this.clearConversationCache(conversationId);
    return this.loadMessages(conversationId).pipe(map((messages) => messages));
  }
}
