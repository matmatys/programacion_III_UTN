import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseObject } from '../basic/response-object.model';
import { ConversationModel } from './model/conversation.model';
import { ConversationStatus } from './model/conversation-status.enum';
import { CreateConversationRequest } from './request/create-conversation.request';
import { UpdateConversationTitleRequest } from './request/update-conversation-title.request';

@ApiTags('conversations')
@Controller('conversations')
export class ConversationController {
  private conversationCounter = 3;

  private conversations: ConversationModel[] = [
    {
      conversationId: 'conv-1',
      title: 'Final project planning',
      status: ConversationStatus.ACTIVE,
      updatedAt: new Date().toISOString(),
    },
    {
      conversationId: 'conv-2',
      title: 'REST endpoint questions',
      status: ConversationStatus.INACTIVE,
      updatedAt: new Date().toISOString(),
    },
    {
      conversationId: 'conv-3',
      title: 'Old notes',
      status: ConversationStatus.ARCHIVED,
      updatedAt: new Date().toISOString(),
    },
  ];

  /** Returns all conversations in memory. */
  @Get()
  @ApiOperation({
    summary: 'List conversation contracts',
    description: 'Returns all conversations with current status and updatedAt values.',
  })
  listConversations(): ResponseObject<ConversationModel[]> {
    return {
      success: true,
      responseMessage: {
        messageCode: '0000',
        message: 'Conversations listed',
      },
      serverTime: new Date().toISOString(),
      data: this.conversations,
    };
  }

  /** Returns one conversation by id. */
  @Get(':conversationId')
  @ApiOperation({
    summary: 'Get one conversation by id',
    description: 'Loads one conversation. Throws 404 when the id does not exist.',
  })
  getConversation(@Param('conversationId') conversationId: string): ResponseObject<ConversationModel> {
    const conversation = this.conversations.find((item) => item.conversationId === conversationId);

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return {
      success: true,
      responseMessage: {
        messageCode: '0000',
        message: 'Conversation loaded',
      },
      serverTime: new Date().toISOString(),
      data: conversation,
    };
  }

  /** Creates a new conversation with ACTIVE status. */
  @Post()
  @ApiOperation({
    summary: 'Create a new conversation contract',
    description: 'Creates a conversation with title from request and sets status to ACTIVE.',
  })
  @ApiBody({ type: CreateConversationRequest })
  createConversation(@Body() request: CreateConversationRequest): ResponseObject<ConversationModel> {
    if (!request.title?.trim()) {
      throw new BadRequestException('Title is required');
    }

    this.conversationCounter += 1;

    const newConversation: ConversationModel = {
      conversationId: `conv-${this.conversationCounter}`,
      title: request.title.trim(),
      status: ConversationStatus.ACTIVE,
      updatedAt: new Date().toISOString(),
    };

    this.conversations.unshift(newConversation);

    return {
      success: true,
      responseMessage: {
        messageCode: '0000',
        message: 'Conversation created',
      },
      serverTime: new Date().toISOString(),
      data: newConversation,
    };
  }

  /** Renames a conversation title. */
  @Patch(':conversationId/title')
  @ApiOperation({
    summary: 'Update conversation title contract',
    description: 'Updates only the title field of one conversation.',
  })
  @ApiBody({ type: UpdateConversationTitleRequest })
  renameConversation(
    @Param('conversationId') conversationId: string,
    @Body() request: UpdateConversationTitleRequest,
  ): ResponseObject<ConversationModel> {
    const conversation = this.conversations.find((item) => item.conversationId === conversationId);

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    if (!request.title?.trim()) {
      throw new BadRequestException('Title is required');
    }

    conversation.title = request.title.trim();
    conversation.updatedAt = new Date().toISOString();

    return {
      success: true,
      responseMessage: {
        messageCode: '0000',
        message: 'Conversation renamed',
      },
      serverTime: new Date().toISOString(),
      data: conversation,
    };
  }

  /** Activates one conversation and sets all other conversations to INACTIVE. */
  @Patch(':conversationId/activate')
  @ApiOperation({
    summary: 'Set one conversation as ACTIVE',
    description: 'Business rule: one ACTIVE conversation at a time. All others become INACTIVE.',
  })
  activateConversation(@Param('conversationId') conversationId: string): ResponseObject<ConversationModel> {
    const targetConversation = this.conversations.find((item) => item.conversationId === conversationId);

    if (!targetConversation) {
      throw new NotFoundException('Conversation not found');
    }

    this.conversations.forEach((conversation) => {
      if (conversation.conversationId === conversationId) {
        conversation.status = ConversationStatus.ACTIVE;
      } else {
        conversation.status = ConversationStatus.INACTIVE;
      }

      conversation.updatedAt = new Date().toISOString();
    });

    return {
      success: true,
      responseMessage: {
        messageCode: '0000',
        message: 'Conversation activated',
      },
      serverTime: new Date().toISOString(),
      data: targetConversation,
    };
  }

  /** Archives one conversation by id. */
  @Patch(':conversationId/archive')
  @ApiOperation({
    summary: 'Archive one conversation',
    description: 'Updates status of one conversation to ARCHIVED.',
  })
  archiveConversation(@Param('conversationId') conversationId: string): ResponseObject<ConversationModel> {
    const conversation = this.conversations.find((item) => item.conversationId === conversationId);

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    conversation.status = ConversationStatus.ARCHIVED;
    conversation.updatedAt = new Date().toISOString();

    return {
      success: true,
      responseMessage: {
        messageCode: '0000',
        message: 'Conversation archived',
      },
      serverTime: new Date().toISOString(),
      data: conversation,
    };
  }
}
