import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conversation } from '../core/model/conversation.interface';
import { MessageRole } from '../core/model/message-role.enum';
import { Message } from '../core/model/message.interface';
import { AuthService } from '../core/service/auth.service';
import { ChatService } from '../core/service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: false,
})
export class ChatComponent implements OnInit {
  // Exposed to template for role-based message styles.
  readonly messageRole = MessageRole;

  // UI feedback for the manual refresh token action.
  refreshMessage = '';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
  ) {}

  ngOnInit(): void {
    // On page load, validate session by requesting current user.
    this.authService.loadCurrentUser().subscribe({
      next: (ok) => {
        if (!ok) {
          // Invalid session: clear auth state and go back to login.
          this.authService.logout(false);
          this.router.navigate(['/login']);
          return;
        }

        // Valid session: load conversations and first message list.
        this.loadConversationsAndFirstMessages();
      },
      error: () => {
        this.authService.logout(false);
        this.router.navigate(['/login']);
      },
    });
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

  get visibleConversations(): Conversation[] {
    return this.chatService.getVisibleConversations();
  }

  get isLoadingConversations(): boolean {
    return this.chatService.isLoadingConversations();
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
    // Activate conversation in backend first, then load its messages.
    this.chatService.activateConversation(conversationId).subscribe({
      next: () => {
        this.chatService.selectConversation(conversationId);

        this.chatService.loadMessages(conversationId).subscribe({
          error: (error: unknown) => {
            console.error('Load messages failed', error);
          },
        });
      },
      error: (error: unknown) => {
        console.error('Activate conversation failed', error);
      },
    });
  }

  createNewConversation(): void {
    // Create conversation in backend and auto-load new chat messages.
    this.chatService.createNewConversation().subscribe({
      next: (conversation) => {
        this.chatService.loadMessages(conversation.id).subscribe({
          error: (error: unknown) => {
            console.error('Load messages failed', error);
          },
        });
      },
      error: (error: unknown) => {
        console.error('Create conversation failed', error);
      },
    });
  }

  archiveConversation(conversationId: string, event: MouseEvent): void {
    // Prevent click bubbling to the "select conversation" action.
    event.stopPropagation();

    // Archive in backend and then refresh currently selected messages.
    this.chatService.archiveConversation(conversationId).subscribe({
      next: () => {
        const selectedConversationId = this.chatService.getSelectedConversationId();

        if (!selectedConversationId) {
          return;
        }

        this.chatService.reloadMessagesForConversation(selectedConversationId).subscribe({
          error: (error: unknown) => {
            console.error('Reload messages failed', error);
          },
        });
      },
      error: (error: unknown) => {
        console.error('Archive conversation failed', error);
      },
    });
  }

  onConversationFilterInput(value: string): void {
    this.chatService.setConversationFilter(value);
  }

  onDraftInput(value: string): void {
    this.chatService.setDraftMessage(value);
  }

  sendMessage(event: Event): void {
    // Prevent native form reload and send through chat service.
    event.preventDefault();
    this.chatService.sendDraftMessage().subscribe({
      error: (error: unknown) => {
        console.error('Send message failed', error);
      },
    });
  }

  onRefreshTokenClick(): void {
    // Calls refresh endpoint and updates UI with simple status text.
    this.refreshMessage = '';

    this.authService.refreshAccessToken().subscribe({
      next: (ok) => {
        this.refreshMessage = ok ? 'Access token refreshed.' : 'Could not refresh token.';
      },
      error: () => {
        this.refreshMessage = 'Could not refresh token.';
      },
    });
  }

  onLogoutClick(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private loadConversationsAndFirstMessages(): void {
    // Initial chat load used after successful auth check.
    this.chatService.loadConversations().subscribe({
      next: () => {
        const selectedConversationId = this.chatService.getSelectedConversationId();

        if (!selectedConversationId) {
          return;
        }

        this.chatService.loadMessages(selectedConversationId).subscribe({
          error: (error: unknown) => {
            console.error('Load messages failed', error);
          },
        });
      },
      error: (error: unknown) => {
        console.error('Load conversations failed', error);
      },
    });
  }
}
