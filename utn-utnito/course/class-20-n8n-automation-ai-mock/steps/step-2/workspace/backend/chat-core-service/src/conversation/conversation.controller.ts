import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { AbstractController } from '../basic/abstract.controller';
import { CreateConversationRequest } from './request/create-conversation.request';
import { UpdateConversationTitleRequest } from './request/update-conversation-title.request';
import { ConversationService } from './conversation.service';

// Swagger decorator: groups conversation endpoints in one Swagger section.
@ApiTags('conversations')
// Swagger decorator: marks these endpoints as Bearer-protected in Swagger.
@ApiBearerAuth('jwtAuth')
@UseGuards(JwtAuthGuard)
@Controller('conversations')
export class ConversationController extends AbstractController {
  constructor(private readonly conversationService: ConversationService) {
    super();
  }

  /** Delegates list flow to ConversationService. */
  @Get()
  // Swagger decorator: describes endpoint behavior in Swagger docs.
  @ApiOperation({ summary: 'List conversations (controller passthrough)' })
  async listConversations() {
    const conversations = await this.conversationService.listConversations();
    return this.createOkResponseWithMessage(conversations, 'Conversations listed');
  }

  /** Delegates get-by-id flow to ConversationService. */
  @Get(':conversationId')
  // Swagger decorator: describes endpoint behavior in Swagger docs.
  @ApiOperation({ summary: 'Get one conversation by id (controller passthrough)' })
  async getConversation(@Param('conversationId') conversationId: string) {
    const conversation = await this.conversationService.getConversationById(conversationId);
    return this.createOkResponseWithMessage(conversation, 'Conversation loaded');
  }

  /** Delegates create flow to ConversationService. */
  @Post()
  // Swagger decorator: describes endpoint behavior in Swagger docs.
  @ApiOperation({ summary: 'Create one conversation (controller passthrough)' })
  // Swagger decorator: documents expected JSON body shape.
  @ApiBody({ type: CreateConversationRequest })
  async createConversation(@Body() request: CreateConversationRequest) {
    const conversation = await this.conversationService.createConversation(request);
    return this.createOkResponseWithMessage(conversation, 'Conversation created');
  }

  /** Delegates title update flow to ConversationService. */
  @Patch(':conversationId/title')
  // Swagger decorator: describes endpoint behavior in Swagger docs.
  @ApiOperation({ summary: 'Rename one conversation (controller passthrough)' })
  // Swagger decorator: documents expected JSON body shape.
  @ApiBody({ type: UpdateConversationTitleRequest })
  async renameConversation(
    @Param('conversationId') conversationId: string,
    @Body() request: UpdateConversationTitleRequest,
  ) {
    const conversation = await this.conversationService.renameConversation(conversationId, request);
    return this.createOkResponseWithMessage(conversation, 'Conversation renamed');
  }

  /** Delegates activate flow to ConversationService. */
  @Patch(':conversationId/activate')
  // Swagger decorator: describes endpoint behavior in Swagger docs.
  @ApiOperation({ summary: 'Activate one conversation (controller passthrough)' })
  async activateConversation(@Param('conversationId') conversationId: string) {
    const conversation = await this.conversationService.activateConversation(conversationId);
    return this.createOkResponseWithMessage(conversation, 'Conversation activated');
  }

  /** Delegates archive flow to ConversationService. */
  @Patch(':conversationId/archive')
  // Swagger decorator: describes endpoint behavior in Swagger docs.
  @ApiOperation({ summary: 'Archive one conversation (controller passthrough)' })
  async archiveConversation(@Param('conversationId') conversationId: string) {
    const conversation = await this.conversationService.archiveConversation(conversationId);
    return this.createOkResponseWithMessage(conversation, 'Conversation archived');
  }
}
