import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conversation } from '../core/model/conversation.interface';
import { Message } from '../core/model/message.interface';
import { MessageRole } from '../core/model/message-role.enum';
import { AuthService } from '../core/service/auth.service';
import { ChatService } from '../core/service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: false,
})
export class ChatComponent implements OnInit {
  protected readonly messageRole = MessageRole;

  selectedConversationId: string | null = null;
  conversationFilter = '';
  draftMessage = '';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.syncSelectedConversation();
  }

  get displayName(): string {
    return this.authService.getDisplayName();
  }

  get initials(): string {
    return this.authService.getInitials();
  }

  get filteredConversations(): Conversation[] {
    return this.chatService.getFilteredConversations(this.conversationFilter);
  }

  get activeConversation(): Conversation | null {
    return this.chatService.getActiveConversation(this.selectedConversationId);
  }

  get activeConversationTitle(): string {
    return this.chatService.getActiveConversationTitle(this.selectedConversationId);
  }

  get visibleMessages(): Message[] {
    return this.chatService.getVisibleMessages(this.selectedConversationId);
  }

  selectConversation(conversationId: string): void {
    this.selectedConversationId = conversationId;
  }

  createNewConversation(): void {
    const newConversation = this.chatService.createNewConversation();
    this.selectedConversationId = newConversation.id;
    this.conversationFilter = '';
    this.draftMessage = '';
  }

  archiveConversation(conversationId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.chatService.archiveConversation(conversationId);
    this.syncSelectedConversation();
  }

  onConversationFilterInput(value: string): void {
    this.conversationFilter = value;
    this.syncSelectedConversation();
  }

  onDraftInput(value: string): void {
    this.draftMessage = value;
  }

  sendMessage(event: Event): void {
    event.preventDefault();
    const messageSent = this.chatService.sendMessage(this.selectedConversationId, this.draftMessage);
    if (messageSent) {
      this.draftMessage = '';
    }
  }

  onLogoutClick(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private syncSelectedConversation(): void {
    this.selectedConversationId = this.chatService.ensureSelectedConversation(
      this.selectedConversationId,
      this.conversationFilter,
    );
  }
}
