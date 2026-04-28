import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/service/auth.service';
import { ChatService } from '../core/service/chat.service';
import { Conversation } from '../core/model/conversation.interface';
import { Message } from '../core/model/message.interface';
import { MessageRole } from '../core/model/message-role.enum';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: false,
})
export class ChatComponent implements OnInit {
  readonly messageRole = MessageRole;

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

    this.chatService.ensureSelectedConversation();
  }

  get displayName(): string {
    return this.authService.getDisplayName();
  }

  get initials(): string {
    return this.authService.getInitials();
  }

  get selectedConversationId(): string | null {
    return this.chatService.getSelectedConversationId();
  }

  get conversationFilter(): string {
    return this.chatService.getConversationFilter();
  }

  get draftMessage(): string {
    return this.chatService.getDraftMessage();
  }

  get filteredConversations(): Conversation[] {
    return this.chatService.getFilteredConversations();
  }

  get activeConversation(): Conversation | null {
    return this.chatService.getActiveConversation();
  }

  get activeConversationTitle(): string {
    return this.chatService.getActiveConversationTitle();
  }

  get visibleMessages(): Message[] {
    return this.chatService.getVisibleMessages();
  }

  selectConversation(conversationId: string): void {
    this.chatService.selectConversation(conversationId);
  }

  createNewConversation(): void {
    this.chatService.createNewConversation();
  }

  archiveConversation(conversationId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.chatService.archiveConversation(conversationId);
  }

  onConversationFilterInput(value: string): void {
    this.chatService.setConversationFilter(value);
  }

  onDraftInput(value: string): void {
    this.chatService.setDraftMessage(value);
  }

  sendMessage(event: Event): void {
    event.preventDefault();
    this.chatService.sendDraftMessage();
  }

  onLogoutClick(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
