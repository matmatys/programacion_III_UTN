import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Conversation } from '../core/model/conversation.interface';
import { ConversationStatus } from '../core/model/conversation-status.enum';
import { Message } from '../core/model/message.interface';
import { MessageRole } from '../core/model/message-role.enum';
import { AuthUser } from '../core/model/auth-user.interface';
import { ApiError } from '../core/model/api-error.model';
import { isApiErrorCode } from '../core/model/api-error-code.enum';
import { AuthService } from '../core/service/auth.service';
import { ChatApiService } from '../core/service/chat-api.service';
import { I18nService } from '../core/service/i18n.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: false,
})
export class ChatComponent implements OnInit {
  readonly messageRole = MessageRole;
  readonly agentName = environment.agentName;
  readonly agentVersion = environment.chatAgentVersion;

  currentUser: AuthUser | null = null;

  conversations: Conversation[] = [];
  selectedConversationId: string | null = null;
  messages: Message[] = [];

  chatListFilter = '';
  messageSearch = '';
  draftMessage = '';

  loadingConversations = false;
  loadingMessages = false;
  creatingConversation = false;
  editingConversationId: string | null = null;
  renameTitleDraft = '';
  renamingConversationId: string | null = null;
  archivingConversationId: string | null = null;
  sendingMessage = false;

  isSidebarOpen = false;
  errorMessage: string | null = null;

  constructor(
    public readonly i18n: I18nService,
    private readonly authService: AuthService,
    private readonly chatApiService: ChatApiService,
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadConversations();
  }

  get filteredConversations(): Conversation[] {
    const filter = this.chatListFilter.trim().toLowerCase();

    if (!filter) {
      return this.conversations;
    }

    return this.conversations.filter((conversation) =>
      conversation.title.toLowerCase().includes(filter),
    );
  }

  get visibleMessages(): Message[] {
    const filter = this.messageSearch.trim().toLowerCase();

    if (!filter) {
      return this.messages;
    }

    return this.messages.filter((message) => message.content.toLowerCase().includes(filter));
  }

  get displayUserName(): string {
    return this.currentUser?.displayName || this.i18n.t('chat.defaultUserName');
  }

  get userInitials(): string {
    const sourceName = this.displayUserName.trim();

    if (!sourceName) {
      return 'UU';
    }

    const parts = sourceName.split(/\s+/).slice(0, 2);
    return parts.map((part) => part[0]?.toUpperCase() || '').join('') || 'UU';
  }

  get emptyMessageText(): string {
    if (this.messageSearch.trim()) {
      return this.i18n.t('chat.noMessagesMatch');
    }

    return this.i18n.t('chat.startBySending', { agentName: this.agentName });
  }

  createConversation(): void {
    if (this.creatingConversation) {
      return;
    }

    this.creatingConversation = true;
    this.errorMessage = null;

    this.chatApiService
      .createConversation()
      .pipe(
        finalize(() => {
          this.creatingConversation = false;
        }),
      )
      .subscribe({
        next: (conversation) => {
          this.loadConversations(conversation.conversationId);
        },
        error: (error: unknown) => {
          this.setErrorMessageFromUnknown(error);
        },
      });
  }

  selectConversation(conversation: Conversation): void {
    this.errorMessage = null;

    const needsActivation = conversation.status !== ConversationStatus.ACTIVE;
    const activation$ = needsActivation
      ? this.chatApiService.activateConversation(conversation.conversationId)
      : of(conversation);

    activation$.subscribe({
      next: (activeConversation) => {
        this.markConversationAsActive(activeConversation.conversationId);
        this.selectedConversationId = activeConversation.conversationId;
        this.loadMessages(activeConversation.conversationId);

        if (this.isMobileViewport()) {
          this.closeSidebar();
        }
      },
      error: (error: unknown) => {
        this.setErrorMessageFromUnknown(error);
      },
    });
  }

  archiveConversation(conversation: Conversation, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.archivingConversationId || this.renamingConversationId) {
      return;
    }

    this.archivingConversationId = conversation.conversationId;
    this.errorMessage = null;

    this.chatApiService
      .archiveConversation(conversation.conversationId)
      .pipe(
        finalize(() => {
          this.archivingConversationId = null;
        }),
      )
      .subscribe({
        next: () => {
          const preferredConversationId =
            this.selectedConversationId === conversation.conversationId
              ? undefined
              : this.selectedConversationId || undefined;

          this.loadConversations(preferredConversationId);
        },
        error: (error: unknown) => {
          this.setErrorMessageFromUnknown(error);
        },
      });
  }

  startRenameConversation(conversation: Conversation, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.archivingConversationId || this.renamingConversationId) {
      return;
    }

    this.editingConversationId = conversation.conversationId;
    this.renameTitleDraft = conversation.title;
    this.errorMessage = null;
  }

  cancelRenameConversation(event?: MouseEvent): void {
    event?.preventDefault();
    event?.stopPropagation();

    this.editingConversationId = null;
    this.renameTitleDraft = '';
  }

  onRenameConversationKeyDown(event: KeyboardEvent, conversation: Conversation): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.saveRenameConversation(conversation);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelRenameConversation();
    }
  }

  saveRenameConversation(conversation: Conversation, event?: MouseEvent): void {
    event?.preventDefault();
    event?.stopPropagation();

    const normalizedTitle = this.renameTitleDraft.trim();

    if (normalizedTitle.length < 3 || normalizedTitle.length > 80) {
      this.errorMessage = this.i18n.t('chat.renameValidation');
      return;
    }

    if (normalizedTitle === conversation.title) {
      this.cancelRenameConversation();
      return;
    }

    this.renamingConversationId = conversation.conversationId;
    this.errorMessage = null;

    this.chatApiService
      .renameConversationTitle(conversation.conversationId, normalizedTitle)
      .pipe(
        finalize(() => {
          this.renamingConversationId = null;
        }),
      )
      .subscribe({
        next: (updatedConversation) => {
          this.conversations = this.sortConversationsByLastUpdate(
            this.conversations.map((currentConversation) =>
              currentConversation.conversationId === updatedConversation.conversationId
                ? updatedConversation
                : currentConversation,
            ),
          );
          this.cancelRenameConversation();
        },
        error: (error: unknown) => {
          this.setErrorMessageFromUnknown(error);
        },
      });
  }

  sendMessage(): void {
    const content = this.draftMessage.trim();

    if (!content || !this.selectedConversationId || this.sendingMessage) {
      return;
    }

    const conversationId = this.selectedConversationId;

    this.draftMessage = '';
    this.sendingMessage = true;
    this.errorMessage = null;

    this.chatApiService
      .createMessage(conversationId, content)
      .pipe(
        finalize(() => {
          this.sendingMessage = false;
        }),
      )
      .subscribe({
        next: (response) => {
          this.messages = [...this.messages, response.userMessage, response.assistantMessage];
          this.touchConversation(response.conversationId);
        },
        error: (error: unknown) => {
          this.setErrorMessageFromUnknown(error);
        },
      });
  }

  onComposerKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  openSidebar(): void {
    this.isSidebarOpen = true;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  logout(): void {
    this.authService.logout();
  }

  trackByConversation(_index: number, conversation: Conversation): string {
    return conversation.conversationId;
  }

  trackByMessage(_index: number, message: Message): string {
    return message.messageId;
  }

  private loadCurrentUser(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.authService.logout();
      },
    });
  }

  private loadConversations(preferredConversationId?: string): void {
    this.loadingConversations = true;
    this.errorMessage = null;

    this.chatApiService
      .listConversations({ page: 1, limit: 80 })
      .pipe(
        finalize(() => {
          this.loadingConversations = false;
        }),
      )
      .subscribe({
        next: (pagination) => {
          this.conversations = this.sortConversationsByLastUpdate(pagination.data);

          if (!this.conversations.length) {
            this.selectedConversationId = null;
            this.messages = [];
            return;
          }

          const targetConversation = this.getInitialConversation(preferredConversationId);

          if (targetConversation) {
            this.selectConversation(targetConversation);
          }
        },
        error: (error: unknown) => {
          this.setErrorMessageFromUnknown(error);
        },
      });
  }

  private loadMessages(conversationId: string): void {
    this.loadingMessages = true;

    this.chatApiService
      .listMessages(conversationId, 1, 100)
      .pipe(
        finalize(() => {
          this.loadingMessages = false;
        }),
      )
      .subscribe({
        next: (pagination) => {
          this.messages = pagination.data;
        },
        error: (error: unknown) => {
          this.setErrorMessageFromUnknown(error);
        },
      });
  }

  private getInitialConversation(preferredConversationId?: string): Conversation | undefined {
    if (preferredConversationId) {
      return this.conversations.find(
        (conversation) => conversation.conversationId === preferredConversationId,
      );
    }

    const activeConversation = this.conversations.find(
      (conversation) => conversation.status === ConversationStatus.ACTIVE,
    );

    return activeConversation || this.conversations[0];
  }

  private markConversationAsActive(activeConversationId: string): void {
    this.conversations = this.sortConversationsByLastUpdate(
      this.conversations.map((conversation) => {
        if (conversation.conversationId === activeConversationId) {
          return {
            ...conversation,
            status: ConversationStatus.ACTIVE,
          };
        }

        if (conversation.status === ConversationStatus.ARCHIVED) {
          return conversation;
        }

        return {
          ...conversation,
          status: ConversationStatus.INACTIVE,
        };
      }),
    );
  }

  private touchConversation(conversationId: string): void {
    const nowIso = new Date().toISOString();

    this.conversations = this.sortConversationsByLastUpdate(
      this.conversations.map((conversation) => {
        if (conversation.conversationId !== conversationId) {
          if (conversation.status === ConversationStatus.ARCHIVED) {
            return conversation;
          }

          return {
            ...conversation,
            status: ConversationStatus.INACTIVE,
          };
        }

        return {
          ...conversation,
          status: ConversationStatus.ACTIVE,
          lastUpdate: nowIso,
        };
      }),
    );
  }

  private sortConversationsByLastUpdate(conversations: Conversation[]): Conversation[] {
    return [...conversations].sort((a, b) => {
      const aTime = new Date(a.lastUpdate).getTime();
      const bTime = new Date(b.lastUpdate).getTime();

      return bTime - aTime;
    });
  }

  private isMobileViewport(): boolean {
    return window.matchMedia('(max-width: 767px)').matches;
  }

  private setErrorMessageFromUnknown(error: unknown): void {
    if (error instanceof ApiError && error.code && isApiErrorCode(error.code)) {
      const localizedMessage = this.i18n.t(`chat.error.${error.code}`);
      this.errorMessage = localizedMessage.startsWith('chat.error.') ? error.message : localizedMessage;
      return;
    }

    if (error instanceof Error && error.message) {
      this.errorMessage = error.message;
      return;
    }

    this.errorMessage = this.i18n.t('chat.error.generic');
  }
}
