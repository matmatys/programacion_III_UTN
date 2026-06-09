import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiContextMessage } from '../ai/ai-provider.interface';
import { AiService } from '../ai/ai.service';
import { ConversationService } from '../conversation/conversation.service';
import { MessageEntity } from './entity/message.entity';
import { CreateMessageResponseModel } from './model/create-message-response.model';
import { MessageModel } from './model/message.model';
import { MessageRole } from './model/message-role.enum';
import { CreateMessageRequest } from './request/create-message.request';

@Injectable()
export class MessageService {
  private messageSequence = 0;

  constructor(
    private readonly conversationService: ConversationService,
    private readonly aiService: AiService,
    private readonly configService: ConfigService,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  /** Lists messages for a conversation after validating it exists. */
  async listMessages(conversationId: string): Promise<MessageModel[]> {
    await this.conversationService.ensureConversationExists(conversationId);

    const messages = await this.messageRepository.find({
      where: {
        conversationId,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    return messages.map((message) => MessageModel.fromEntityToModel(message));
  }

  /** Creates user message plus assistant reply for one conversation. */
  async createMessage(
    userId: string,
    userDisplayName: string,
    conversationId: string,
    request: CreateMessageRequest,
  ): Promise<CreateMessageResponseModel> {
    const conversation = await this.conversationService.ensureConversationAllowsMessages(conversationId);

    await this.conversationService.activateConversation(conversationId);

    const userMessageEntity = this.messageRepository.create({
      messageId: this.buildMessageId(),
      conversationId,
      role: MessageRole.USER,
      content: request.content,
    });

    const savedUserMessage = await this.messageRepository.save(userMessageEntity);

    const maxContextPairs = Number(this.configService.get<string>('AI_CONTEXT_MAX_PAIRS', '5'));
    const recentMessages = await this.getRecentMessagesForAi(conversationId, maxContextPairs);
    const assistantContent = await this.aiService.generateReply({
      userId,
      userDisplayName,
      conversationId,
      conversationTitle: conversation.title,
      latestUserMessage: request.content,
      recentMessages,
    });

    const assistantMessageEntity = this.messageRepository.create({
      messageId: this.buildMessageId(),
      conversationId,
      role: MessageRole.ASSISTANT,
      content: assistantContent,
    });

    const savedAssistantMessage = await this.messageRepository.save(assistantMessageEntity);

    await this.conversationService.touchConversation(conversationId);

    return new CreateMessageResponseModel(
      MessageModel.fromEntityToModel(savedUserMessage),
      MessageModel.fromEntityToModel(savedAssistantMessage),
    );
  }

  /** Deletes one message from a conversation and returns deleted id. */
  async deleteMessage(
    conversationId: string,
    messageId: string,
  ): Promise<{ deletedMessageId: string }> {
    await this.conversationService.ensureConversationExists(conversationId);

    const deleteResult = await this.messageRepository.delete({
      conversationId,
      messageId,
    });

    if (!deleteResult.affected) {
      throw new NotFoundException('Message not found');
    }

    return { deletedMessageId: messageId };
  }

  /** Creates readable ids for classroom demos. */
  private buildMessageId(): string {
    this.messageSequence += 1;
    return `msg-${Date.now()}-${this.messageSequence}`;
  }

  private async getRecentMessagesForAi(
    conversationId: string,
    maxPairs: number,
  ): Promise<AiContextMessage[]> {
    const numericPairs = Number(maxPairs);
    const safePairs =
      Number.isFinite(numericPairs) && numericPairs > 0 ? Math.floor(numericPairs) : 5;
    const maxMessages = safePairs * 2;

    const messages = await this.messageRepository.find({
      where: {
        conversationId,
      },
      order: {
        createdAt: 'DESC',
      },
      take: maxMessages,
    });

    return messages.reverse().map((message) => ({
      role: message.role,
      content: message.content,
      createdAt: message.createdAt.toISOString(),
    }));
  }
}
