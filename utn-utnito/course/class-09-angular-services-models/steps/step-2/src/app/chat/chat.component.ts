import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Conversation } from '../core/model/conversation.interface';
import { Message } from '../core/model/message.interface';
import { MessageRole } from '../core/model/message-role.enum';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: false,
})
export class ChatComponent {
  protected readonly messageRole = MessageRole;
  readonly displayName = 'Carlos Gardel';
  readonly initials = 'CG';

  conversations: Conversation[] = [
    {
      id: 'conv-1',
      title: 'Final project planning',
      archived: false,
      messages: [
        { id: 'm-1', role: MessageRole.ASSISTANT, content: 'Hi! Ready to review today\'s class goals?' },
        { id: 'm-2', role: MessageRole.USER, content: 'Yes, show me the checkpoint for class 8.' },
      ],
    },
    {
      id: 'conv-2',
      title: 'REST endpoint questions',
      archived: false,
      messages: [{ id: 'm-3', role: MessageRole.ASSISTANT, content: 'Ask me anything about API design.' }],
    },
    {
      id: 'conv-3',
      title: 'Docker setup help',
      archived: false,
      messages: [],
    },
  ];

  selectedConversationId: string | null = 'conv-1';
  conversationFilter = '';
  draftMessage = '';
  messageCounter = 3;
  conversationCounter = 3;

  constructor(private readonly router: Router) {}

  get visibleConversations(): Conversation[] {
    return this.conversations.filter((conversation) => !conversation.archived);
  }

  get filteredConversations(): Conversation[] {
    const normalizedFilter = this.conversationFilter.trim().toLowerCase();

    if (!normalizedFilter) {
      return this.visibleConversations;
    }

    return this.visibleConversations.filter((conversation) =>
      conversation.title.toLowerCase().includes(normalizedFilter),
    );
  }

  get activeConversation(): Conversation | null {
    if (!this.selectedConversationId) {
      return null;
    }

    return this.conversations.find(
      (conversation) => conversation.id === this.selectedConversationId && !conversation.archived,
    ) || null;
  }

  get activeConversationTitle(): string {
    return this.activeConversation?.title || 'No conversation selected';
  }

  get visibleMessages(): Message[] {
    return this.activeConversation?.messages || [];
  }

  selectConversation(conversationId: string): void {
    this.selectedConversationId = conversationId;
  }

  createNewConversation(): void {
    const nextConversationIndex = this.conversationCounter + 1;

    const newConversation: Conversation = {
      id: this.buildConversationId(),
      title: `New conversation ${nextConversationIndex}`,
      archived: false,
      messages: [
        {
          id: this.buildMessageId(),
          role: MessageRole.ASSISTANT,
          content: 'New chat created. Ask me anything.',
        },
      ],
    };

    // unshift adds at the beginning of the list; push adds at the end.
    this.conversations.unshift(newConversation);
    this.selectedConversationId = newConversation.id;
    this.conversationFilter = '';
    this.draftMessage = '';
  }

  archiveConversation(conversationId: string, event: MouseEvent): void {
    event.stopPropagation();

    const conversation = this.conversations.find((item) => item.id === conversationId && !item.archived);
    if (!conversation) {
      return;
    }

    conversation.archived = true;

    if (this.selectedConversationId === conversationId) {
      this.selectedConversationId = this.filteredConversations[0]?.id || null;
    }
  }

  onConversationFilterInput(value: string): void {
    this.conversationFilter = value;

    if (!this.selectedConversationId) {
      return;
    }

    const filteredConversations = this.filteredConversations;
    const selectedConversationVisible = filteredConversations.some(
      (conversation) => conversation.id === this.selectedConversationId,
    );

    if (!selectedConversationVisible) {
      this.selectedConversationId = filteredConversations[0]?.id || null;
    }
  }

  onDraftInput(value: string): void {
    this.draftMessage = value;
  }

  sendMessage(event: Event): void {
    event.preventDefault();

    const activeConversation = this.activeConversation;
    const normalizedDraft = this.draftMessage.trim();

    if (!activeConversation || !normalizedDraft) {
      return;
    }

    activeConversation.messages.push({
      id: this.buildMessageId(),
      role: MessageRole.USER,
      content: normalizedDraft,
    });

    activeConversation.messages.push({
      id: this.buildMessageId(),
      role: MessageRole.ASSISTANT,
      content: `Mock reply: I received "${normalizedDraft}".`,
    });

    this.draftMessage = '';
  }

  onLogoutClick(): void {
    this.router.navigate(['/login']);
  }

  private buildConversationId(): string {
    this.conversationCounter += 1;
    return `conv-${this.conversationCounter}`;
  }

  private buildMessageId(): string {
    this.messageCounter += 1;
    return `m-${this.messageCounter}`;
  }
}
