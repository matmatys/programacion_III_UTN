import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { AbstractController } from '../basic/abstract.controller';
import { MessageService } from './message.service';
import { CreateMessageRequest } from './request/create-message.request';

// Swagger decorator: groups message endpoints in one Swagger section.
@ApiTags('messages')
// Swagger decorator: marks these endpoints as Bearer-protected in Swagger.
@ApiBearerAuth('jwtAuth')
@UseGuards(JwtAuthGuard)
@Controller('conversations/:conversationId/messages')
export class MessageController extends AbstractController {
  constructor(private readonly messageService: MessageService) {
    super();
  }

  /** Delegates list flow to MessageService. */
  @Get()
  // Swagger decorator: describes endpoint behavior in Swagger docs.
  @ApiOperation({ summary: 'List messages by conversation (controller passthrough)' })
  async listMessages(@Param('conversationId') conversationId: string) {
    const messages = await this.messageService.listMessages(conversationId);
    return this.createOkResponseWithMessage(messages, 'Messages listed');
  }

  /** Delegates create flow to MessageService. */
  @Post()
  // Swagger decorator: describes endpoint behavior in Swagger docs.
  @ApiOperation({ summary: 'Create message + assistant reply (controller passthrough)' })
  // Swagger decorator: documents expected JSON body shape.
  @ApiBody({ type: CreateMessageRequest })
  async createMessage(
    @Param('conversationId') conversationId: string,
    @Body() request: CreateMessageRequest,
  ) {
    const response = await this.messageService.createMessage(conversationId, request);
    return this.createOkResponseWithMessage(response, 'Message created');
  }

  /** Delegates delete flow to MessageService. */
  @Delete(':messageId')
  // Swagger decorator: describes endpoint behavior in Swagger docs.
  @ApiOperation({ summary: 'Delete one message (controller passthrough)' })
  async deleteMessage(
    @Param('conversationId') conversationId: string,
    @Param('messageId') messageId: string,
  ) {
    const response = await this.messageService.deleteMessage(conversationId, messageId);
    return this.createOkResponseWithMessage(response, 'Message deleted');
  }
}
