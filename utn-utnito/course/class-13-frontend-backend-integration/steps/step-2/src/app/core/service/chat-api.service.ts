import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Conversation } from '../model/conversation.interface';
import { CreateMessageResponse } from '../model/create-message-response.interface';
import { Message } from '../model/message.interface';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class ChatApiService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  listConversations(): Observable<Conversation[]> {
    return throwError(() => new Error('Step 1 skeleton: implement in step 3'));
  }

  listMessages(_conversationId: string): Observable<Message[]> {
    return throwError(() => new Error('Step 1 skeleton: implement in step 3'));
  }

  createMessage(_conversationId: string, _content: string): Observable<CreateMessageResponse> {
    return throwError(() => new Error('Step 1 skeleton: implement in step 3'));
  }

  createConversation(_title: string): Observable<Conversation> {
    return throwError(() => new Error('Step 1 skeleton: implement in step 4'));
  }

  activateConversation(_conversationId: string): Observable<Conversation> {
    return throwError(() => new Error('Step 1 skeleton: implement in step 4'));
  }

  archiveConversation(_conversationId: string): Observable<Conversation> {
    return throwError(() => new Error('Step 1 skeleton: implement in step 4'));
  }
}
