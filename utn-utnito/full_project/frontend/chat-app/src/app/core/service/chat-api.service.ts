import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { Conversation } from '../model/conversation.interface';
import { Pagination } from '../model/pagination.interface';
import { Message } from '../model/message.interface';
import { CreateMessageResponse } from '../model/create-message-response.interface';
import { ResponseObject } from '../model/response-object.interface';
import { ResponseMessage } from '../model/response-message.interface';
import { ApiError } from '../model/api-error.model';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  listConversations(params?: {
    search?: string;
    page?: number;
    limit?: number;
    includeArchived?: boolean;
  }): Observable<Pagination<Conversation>> {
    return this.unwrapResponse(
      this.get<Pagination<Conversation>>('chat-app/conversations', params),
      'Failed to load conversations',
    );
  }

  createConversation(title?: string): Observable<Conversation> {
    return this.unwrapResponse(
      this.post<Conversation>('chat-app/conversations', {
        title: title?.trim() || undefined,
      }),
      'Failed to create conversation',
    );
  }

  activateConversation(conversationId: string): Observable<Conversation> {
    return this.unwrapResponse(
      this.patch<Conversation>(`chat-app/conversations/${conversationId}/activate`, {}),
      'Failed to activate conversation',
    );
  }

  renameConversationTitle(conversationId: string, title: string): Observable<Conversation> {
    return this.unwrapResponse(
      this.patch<Conversation>(`chat-app/conversations/${conversationId}/title`, {
        title,
      }),
      'Failed to rename conversation',
    );
  }

  archiveConversation(conversationId: string): Observable<Conversation> {
    return this.unwrapResponse(
      this.patch<Conversation>(`chat-app/conversations/${conversationId}/archive`, {}),
      'Failed to archive conversation',
    );
  }

  listMessages(conversationId: string, page = 1, limit = 50): Observable<Pagination<Message>> {
    return this.unwrapResponse(
      this.get<Pagination<Message>>(`chat-app/conversations/${conversationId}/messages`, {
        page,
        limit,
      }),
      'Failed to load messages',
    );
  }

  createMessage(conversationId: string, content: string): Observable<CreateMessageResponse> {
    return this.unwrapResponse(
      this.post<CreateMessageResponse>(`chat-app/conversations/${conversationId}/messages`, {
        content,
      }),
      'Failed to send message',
    );
  }

  private unwrapResponse<T>(
    source$: Observable<ResponseObject<T>>,
    fallbackMessage: string,
  ): Observable<T> {
    return source$.pipe(
      map((response) => {
        if (!response.success) {
          const code = response.responseMessage?.messageCode || null;
          const message = response.responseMessage?.message || fallbackMessage;
          throw new ApiError(code, message);
        }

        return response.data;
      }),
      catchError((error: unknown) => throwError(() => this.normalizeError(error, fallbackMessage))),
    );
  }

  private normalizeError(error: unknown, fallbackMessage: string): ApiError {
    if (error instanceof ApiError) {
      return error;
    }

    if (error instanceof HttpErrorResponse) {
      const responseMessage = this.extractResponseMessage(error.error);

      return new ApiError(
        responseMessage?.messageCode || null,
        responseMessage?.message || fallbackMessage,
      );
    }

    if (error instanceof Error) {
      return new ApiError(null, error.message || fallbackMessage);
    }

    return new ApiError(null, fallbackMessage);
  }

  private extractResponseMessage(errorBody: unknown): ResponseMessage | null {
    if (!errorBody || typeof errorBody !== 'object') {
      return null;
    }

    const responseObject = errorBody as ResponseObject<unknown>;

    if (
      responseObject.responseMessage &&
      typeof responseObject.responseMessage.message === 'string'
    ) {
      return responseObject.responseMessage;
    }

    return null;
  }
}
