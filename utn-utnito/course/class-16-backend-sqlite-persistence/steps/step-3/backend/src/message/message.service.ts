import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConversationService } from '../conversation/conversation.service';
import { CreateMessageResponseModel } from './model/create-message-response.model';
import { MessageModel } from './model/message.model';
import { MessageRole } from './model/message-role.enum';
import { CreateMessageRequest } from './request/create-message.request';

@Injectable()
export class MessageService {
  private messageCounter = 0;

  private messages: MessageModel[] = [];

  constructor(private readonly conversationService: ConversationService) {}

  /** Lists messages for a conversation after validating it exists. */
  async listMessages(conversationId: string): Promise<MessageModel[]> {
    await this.conversationService.ensureConversationExists(conversationId);

    return this.messages.filter((message) => message.conversationId === conversationId);
  }

  /** Creates user message plus mock assistant reply for one conversation. */
  async createMessage(
    conversationId: string,
    request: CreateMessageRequest,
  ): Promise<CreateMessageResponseModel> {
    await this.conversationService.ensureConversationAllowsMessages(conversationId);

    const normalizedContent = request.content?.trim();

    if (!normalizedContent) {
      throw new BadRequestException('Message content is required');
    }

    await this.conversationService.activateConversation(conversationId);

    this.messageCounter += 1;

    const now = new Date().toISOString();

    const userMessage = new MessageModel(
      `msg-${Date.now()}-${this.messageCounter}`,
      conversationId,
      MessageRole.USER,
      normalizedContent,
      now,
      now,
    );

    this.messageCounter += 1;

    const assistantMessage = new MessageModel(
      `msg-${Date.now()}-${this.messageCounter}`,
      conversationId,
      MessageRole.ASSISTANT,
      `Mock assistant reply to: ${normalizedContent}`,
      now,
      now,
    );

    this.messages.push(userMessage);
    this.messages.push(assistantMessage);

    await this.conversationService.touchConversation(conversationId);

    return new CreateMessageResponseModel(userMessage, assistantMessage);
  }

  /** Deletes one message from a conversation and returns deleted id. */
  async deleteMessage(
    conversationId: string,
    messageId: string,
  ): Promise<{ deletedMessageId: string }> {
    await this.conversationService.ensureConversationExists(conversationId);

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
