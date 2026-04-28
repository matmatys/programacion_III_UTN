import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConversationService } from '../conversation/conversation.service';
import { CreateMessageResponseModel } from './model/create-message-response.model';
import { MessageModel } from './model/message.model';
import { MessageRole } from './model/message-role.enum';
import { CreateMessageRequest } from './request/create-message.request';

@Injectable()
export class MessageService {
  private messageCounter = 4;

  private messages: MessageModel[] = [
    new MessageModel(
      'msg-1',
      'conv-1',
      MessageRole.ASSISTANT,
      'Welcome to UTNito API mock implementation.',
      new Date().toISOString(),
      new Date().toISOString(),
    ),
    new MessageModel(
      'msg-2',
      'conv-1',
      MessageRole.USER,
      'Nice. Now services contain business logic.',
      new Date().toISOString(),
      new Date().toISOString(),
    ),
    new MessageModel(
      'msg-3',
      'conv-2',
      MessageRole.USER,
      'How do modules connect services?',
      new Date().toISOString(),
      new Date().toISOString(),
    ),
    new MessageModel(
      'msg-4',
      'conv-2',
      MessageRole.ASSISTANT,
      'MessageModule imports ConversationModule and injects ConversationService.',
      new Date().toISOString(),
      new Date().toISOString(),
    ),
  ];

  constructor(private readonly conversationService: ConversationService) {}

  listMessages(conversationId: string): MessageModel[] {
    this.conversationService.ensureConversationExists(conversationId);

    return this.messages.filter((message) => message.conversationId === conversationId);
  }

  createMessage(
    conversationId: string,
    request: CreateMessageRequest,
  ): CreateMessageResponseModel {
    this.conversationService.ensureConversationAllowsMessages(conversationId);

    const normalizedContent = request.content?.trim();

    if (!normalizedContent) {
      throw new BadRequestException('Message content is required');
    }

    this.conversationService.activateConversation(conversationId);

    this.messageCounter += 1;

    const now = new Date().toISOString();

    const userMessage = new MessageModel(
      `msg-${this.messageCounter}`,
      conversationId,
      MessageRole.USER,
      normalizedContent,
      now,
      now,
    );

    this.messageCounter += 1;

    const assistantMessage = new MessageModel(
      `msg-${this.messageCounter}`,
      conversationId,
      MessageRole.ASSISTANT,
      `Mock assistant reply to: ${normalizedContent}`,
      now,
      now,
    );

    this.messages.push(userMessage);
    this.messages.push(assistantMessage);

    this.conversationService.touchConversation(conversationId);

    return new CreateMessageResponseModel(userMessage, assistantMessage);
  }

  deleteMessage(conversationId: string, messageId: string): { deletedMessageId: string } {
    this.conversationService.ensureConversationExists(conversationId);

    const messageIndex = this.messages.findIndex(
      (message) => message.messageId === messageId && message.conversationId === conversationId,
    );

    if (messageIndex < 0) {
      throw new NotFoundException('Message not found');
    }

    this.messages.splice(messageIndex, 1);

    return { deletedMessageId: messageId };
  }
}
