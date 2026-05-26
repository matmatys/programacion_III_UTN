import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    const userMessageEntity = this.messageRepository.create({
      messageId: this.buildMessageId(),
      conversationId,
      role: MessageRole.USER,
      content: normalizedContent,
    });

    const assistantMessageEntity = this.messageRepository.create({
      messageId: this.buildMessageId(),
      conversationId,
      role: MessageRole.ASSISTANT,
      content: `Mock assistant reply to: ${normalizedContent}`,
    });

    const [savedUserMessage, savedAssistantMessage] = await this.messageRepository.save([
      userMessageEntity,
      assistantMessageEntity,
    ]);

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
}
