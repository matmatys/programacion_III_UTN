import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ChatConversation {
  id: string;
  title: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: false,
})
export class ChatComponent {
  readonly displayName = 'Carlos Gardel';
  readonly initials = 'CG';

  conversations: ChatConversation[] = [
    { id: 'conv-1', title: 'Final project planning' },
    { id: 'conv-2', title: 'REST endpoint questions' },
    { id: 'conv-3', title: 'Docker setup help' },
  ];

  selectedConversationId = 'conv-1';
  draftMessage = '';

  constructor(private readonly router: Router) {}

  get activeConversationTitle(): string {
    const activeConversation = this.conversations.find(
      (conversation) => conversation.id === this.selectedConversationId,
    );

    return activeConversation?.title || 'No conversation selected';
  }

  selectConversation(conversationId: string): void {
    this.selectedConversationId = conversationId;
  }

  onDraftInput(value: string): void {
    this.draftMessage = value;
  }

  onLogoutClick(): void {
    this.router.navigate(['/login']);
  }
}
