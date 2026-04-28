import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Conversation } from '../model/conversation.interface';
import { CreateMessageResponse } from '../model/create-message-response.interface';
import { Message } from '../model/message.interface';
import { MessageRole } from '../model/message-role.enum';
import { BaseApiService } from './base-api.service';

interface BackendConversation {
  conversationId: string;
  title: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
}

interface BackendMessage {
  messageId: string;
  conversationId: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
}

interface BackendCreateMessageResponse {
  userMessage: BackendMessage;
  assistantMessage: BackendMessage;
}

@Injectable({
  providedIn: 'root',
})
export class ChatApiService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  listConversations(): Observable<Conversation[]> {
    return this.get<BackendConversation[]>('conversations').pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Failed to load conversations');
        }

        return response.data.map((conversation) => this.mapConversation(conversation));
      }),
    );
  }

  listMessages(conversationId: string): Observable<Message[]> {
    return this.get<BackendMessage[]>(`conversations/${conversationId}/messages`).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Failed to load messages');
        }

        return response.data.map((message) => this.mapMessage(message));
      }),
    );
  }

  createMessage(conversationId: string, content: string): Observable<CreateMessageResponse> {
    return this.post<BackendCreateMessageResponse>(`conversations/${conversationId}/messages`, { content }).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Failed to send message');
        }

        return {
          userMessage: this.mapMessage(response.data.userMessage),
          assistantMessage: this.mapMessage(response.data.assistantMessage),
        };
      }),
    );
  }

  createConversation(title: string): Observable<Conversation> {
    return this.post<BackendConversation>('conversations', { title }).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Failed to create conversation');
        }

        return this.mapConversation(response.data);
      }),
    );
  }

  activateConversation(conversationId: string): Observable<Conversation> {
    return this.patch<BackendConversation>(`conversations/${conversationId}/activate`, {}).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Failed to activate conversation');
        }

        return this.mapConversation(response.data);
      }),
    );
  }

  archiveConversation(conversationId: string): Observable<Conversation> {
    return this.patch<BackendConversation>(`conversations/${conversationId}/archive`, {}).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Failed to archive conversation');
        }

        return this.mapConversation(response.data);
      }),
    );
  }

  private mapConversation(conversation: BackendConversation): Conversation {
    return {
      id: conversation.conversationId,
      title: conversation.title,
      archived: conversation.status === 'ARCHIVED',
      messages: [],
    };
  }

  private mapMessage(message: BackendMessage): Message {
    return {
      id: message.messageId,
      role: message.role === 'ASSISTANT' ? MessageRole.ASSISTANT : MessageRole.USER,
      content: message.content,
    };
  }
}
