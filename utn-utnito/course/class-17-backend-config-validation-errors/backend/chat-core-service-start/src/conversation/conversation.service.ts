import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationEntity } from './entity/conversation.entity';
import { ConversationModel } from './model/conversation.model';
import { ConversationStatus } from './model/conversation-status.enum';
import { CreateConversationRequest } from './request/create-conversation.request';
import { UpdateConversationTitleRequest } from './request/update-conversation-title.request';

@Injectable()
export class ConversationService {
  private conversationSequence = 0;

  constructor(
    @InjectRepository(ConversationEntity)
    private readonly conversationRepository: Repository<ConversationEntity>,
  ) {}

  /** Returns every conversation currently stored in sqlite. */
  async listConversations(): Promise<ConversationModel[]> {
    const conversations = await this.conversationRepository.find({
      order: {
        updatedAt: 'DESC',
      },
    });

    return conversations.map((conversation) => ConversationModel.fromEntityToModel(conversation));
  }

  /** Returns one conversation by id or throws 404 when not found. */
  async getConversationById(conversationId: string): Promise<ConversationModel> {
    const conversation = await this.getConversationEntityById(conversationId);
    return ConversationModel.fromEntityToModel(conversation);
  }

  /** Creates a new ACTIVE conversation with normalized title. */
  async createConversation(request: CreateConversationRequest): Promise<ConversationModel> {
    const normalizedTitle = request.title?.trim();

    if (!normalizedTitle) {
      throw new BadRequestException('Title is required');
    }

    const conversation = this.conversationRepository.create({
      conversationId: this.buildConversationId(),
      title: normalizedTitle,
      status: ConversationStatus.ACTIVE,
    });

    const savedConversation = await this.conversationRepository.save(conversation);

    return ConversationModel.fromEntityToModel(savedConversation);
  }

  /** Renames a conversation and updates its timestamp. */
  async renameConversation(
    conversationId: string,
    request: UpdateConversationTitleRequest,
  ): Promise<ConversationModel> {
    const conversation = await this.getConversationEntityById(conversationId);
    const normalizedTitle = request.title?.trim();

    if (!normalizedTitle) {
      throw new BadRequestException('Title is required');
    }

    conversation.title = normalizedTitle;

    const savedConversation = await this.conversationRepository.save(conversation);

    return ConversationModel.fromEntityToModel(savedConversation);
  }

  /** Marks selected conversation as ACTIVE and all others as INACTIVE. */
  async activateConversation(conversationId: string): Promise<ConversationModel> {
    await this.getConversationEntityById(conversationId);

    const conversations = await this.conversationRepository.find();

    conversations.forEach((conversation) => {
      if (conversation.conversationId === conversationId) {
        conversation.status = ConversationStatus.ACTIVE;
      } else {
        conversation.status = ConversationStatus.INACTIVE;
      }
    });

    await this.conversationRepository.save(conversations);

    const updatedConversation = await this.getConversationEntityById(conversationId);

    return ConversationModel.fromEntityToModel(updatedConversation);
  }

  /** Marks a conversation as ARCHIVED. */
  async archiveConversation(conversationId: string): Promise<ConversationModel> {
    const conversation = await this.getConversationEntityById(conversationId);

    conversation.status = ConversationStatus.ARCHIVED;

    const savedConversation = await this.conversationRepository.save(conversation);

    return ConversationModel.fromEntityToModel(savedConversation);
  }

  /** Helper used by other modules to ensure conversation exists. */
  async ensureConversationExists(conversationId: string): Promise<ConversationModel> {
    const conversation = await this.getConversationEntityById(conversationId);
    return ConversationModel.fromEntityToModel(conversation);
  }

  /** Helper that blocks new messages in ARCHIVED conversations. */
  async ensureConversationAllowsMessages(conversationId: string): Promise<ConversationModel> {
    const conversation = await this.getConversationEntityById(conversationId);

    if (conversation.status === ConversationStatus.ARCHIVED) {
      throw new BadRequestException('Archived conversations do not allow new messages');
    }

    return ConversationModel.fromEntityToModel(conversation);
  }

  /** Updates `updatedAt` when a conversation receives activity. */
  async touchConversation(conversationId: string): Promise<void> {
    const conversation = await this.getConversationEntityById(conversationId);
    conversation.updatedAt = new Date();
    await this.conversationRepository.save(conversation);
  }

  /** Loads one entity by id or throws 404. */
  private async getConversationEntityById(conversationId: string): Promise<ConversationEntity> {
    const conversation = await this.conversationRepository.findOne({
      where: {
        conversationId,
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }

  /** Creates readable ids for classroom demos. */
  private buildConversationId(): string {
    this.conversationSequence += 1;
    return `conv-${Date.now()}-${this.conversationSequence}`;
  }
}
