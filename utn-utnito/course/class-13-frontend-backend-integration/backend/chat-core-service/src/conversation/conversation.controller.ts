import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AbstractController } from '../basic/abstract.controller';
import { ConversationService } from './conversation.service';
import { CreateConversationRequest } from './request/create-conversation.request';
import { UpdateConversationTitleRequest } from './request/update-conversation-title.request';

@ApiTags('conversations')
@Controller('conversations')
export class ConversationController extends AbstractController {
  constructor(private readonly conversationService: ConversationService) {
    super();
  }

  /** Delegates list flow to ConversationService. */
  @Get()
  @ApiOperation({ summary: 'List conversations (controller passthrough)' })
  listConversations() {
    const conversations = this.conversationService.listConversations();
    return this.createOkResponseWithMessage(conversations, 'Conversations listed');
  }

  /** Delegates get-by-id flow to ConversationService. */
  @Get(':conversationId')
  @ApiOperation({ summary: 'Get one conversation by id (controller passthrough)' })
  getConversation(@Param('conversationId') conversationId: string) {
    const conversation = this.conversationService.getConversationById(conversationId);
    return this.createOkResponseWithMessage(conversation, 'Conversation loaded');
  }

  /** Delegates create flow to ConversationService. */
  @Post()
  @ApiOperation({ summary: 'Create one conversation (controller passthrough)' })
  @ApiBody({ type: CreateConversationRequest })
  createConversation(@Body() request: CreateConversationRequest) {
    const conversation = this.conversationService.createConversation(request);
    return this.createOkResponseWithMessage(conversation, 'Conversation created');
  }

  /** Delegates title update flow to ConversationService. */
  @Patch(':conversationId/title')
  @ApiOperation({ summary: 'Rename one conversation (controller passthrough)' })
  @ApiBody({ type: UpdateConversationTitleRequest })
  renameConversation(
    @Param('conversationId') conversationId: string,
    @Body() request: UpdateConversationTitleRequest,
  ) {
    const conversation = this.conversationService.renameConversation(conversationId, request);
    return this.createOkResponseWithMessage(conversation, 'Conversation renamed');
  }

  /** Delegates activate flow to ConversationService. */
  @Patch(':conversationId/activate')
  @ApiOperation({ summary: 'Activate one conversation (controller passthrough)' })
  activateConversation(@Param('conversationId') conversationId: string) {
    const conversation = this.conversationService.activateConversation(conversationId);
    return this.createOkResponseWithMessage(conversation, 'Conversation activated');
  }

  /** Delegates archive flow to ConversationService. */
  @Patch(':conversationId/archive')
  @ApiOperation({ summary: 'Archive one conversation (controller passthrough)' })
  archiveConversation(@Param('conversationId') conversationId: string) {
    const conversation = this.conversationService.archiveConversation(conversationId);
    return this.createOkResponseWithMessage(conversation, 'Conversation archived');
  }
}
