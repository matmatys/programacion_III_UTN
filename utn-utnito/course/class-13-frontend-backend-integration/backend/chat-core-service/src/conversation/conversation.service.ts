import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConversationModel } from './model/conversation.model';
import { ConversationStatus } from './model/conversation-status.enum';
import { CreateConversationRequest } from './request/create-conversation.request';
import { UpdateConversationTitleRequest } from './request/update-conversation-title.request';

@Injectable()
export class ConversationService {
  private conversationCounter = 3;

  private conversations: ConversationModel[] = [
    new ConversationModel(
      'conv-1',
      'Final project planning',
      ConversationStatus.ACTIVE,
      new Date().toISOString(),
      new Date().toISOString(),
    ),
    new ConversationModel(
      'conv-2',
      'REST endpoint questions',
      ConversationStatus.INACTIVE,
      new Date().toISOString(),
      new Date().toISOString(),
    ),
    new ConversationModel(
      'conv-3',
      'Old notes',
      ConversationStatus.ARCHIVED,
      new Date().toISOString(),
      new Date().toISOString(),
    ),
  ];

  listConversations(): ConversationModel[] {
    return this.conversations;
  }

  getConversationById(conversationId: string): ConversationModel {
    const conversation = this.conversations.find((item) => item.conversationId === conversationId);

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }

  createConversation(request: CreateConversationRequest): ConversationModel {
    const normalizedTitle = request.title?.trim();

    if (!normalizedTitle) {
      throw new BadRequestException('Title is required');
    }

    this.conversationCounter += 1;

    const now = new Date().toISOString();

    const conversation = new ConversationModel(
      `conv-${this.conversationCounter}`,
      normalizedTitle,
      ConversationStatus.ACTIVE,
      now,
      now,
    );

    this.conversations.unshift(conversation);

    return conversation;
  }

  renameConversation(
    conversationId: string,
    request: UpdateConversationTitleRequest,
  ): ConversationModel {
    const conversation = this.getConversationById(conversationId);
    const normalizedTitle = request.title?.trim();

    if (!normalizedTitle) {
      throw new BadRequestException('Title is required');
    }

    conversation.title = normalizedTitle;
    conversation.updatedAt = new Date().toISOString();

    return conversation;
  }

  activateConversation(conversationId: string): ConversationModel {
    const targetConversation = this.getConversationById(conversationId);

    this.conversations.forEach((conversation) => {
      if (conversation.conversationId === conversationId) {
        conversation.status = ConversationStatus.ACTIVE;
      } else {
        conversation.status = ConversationStatus.INACTIVE;
      }

      conversation.updatedAt = new Date().toISOString();
    });

    return targetConversation;
  }

  archiveConversation(conversationId: string): ConversationModel {
    const conversation = this.getConversationById(conversationId);

    conversation.status = ConversationStatus.ARCHIVED;
    conversation.updatedAt = new Date().toISOString();

    return conversation;
  }

  ensureConversationExists(conversationId: string): ConversationModel {
    return this.getConversationById(conversationId);
  }

  ensureConversationAllowsMessages(conversationId: string): ConversationModel {
    const conversation = this.getConversationById(conversationId);

    if (conversation.status === ConversationStatus.ARCHIVED) {
      throw new BadRequestException('Archived conversations do not allow new messages');
    }

    return conversation;
  }

  touchConversation(conversationId: string): void {
    const conversation = this.getConversationById(conversationId);
    conversation.updatedAt = new Date().toISOString();
  }
}
