import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AbstractController } from '../basic/abstract.controller';
import { CreateMessageRequest } from './request/create-message.request';
import { MessageService } from './message.service';

@ApiTags('messages')
@Controller('conversations/:conversationId/messages')
export class MessageController extends AbstractController {
  constructor(private readonly messageService: MessageService) {
    super();
  }

  /** Delegates list flow to MessageService. */
  @Get()
  @ApiOperation({ summary: 'List messages by conversation (controller passthrough)' })
  listMessages(@Param('conversationId') conversationId: string) {
    const messages = this.messageService.listMessages(conversationId);
    return this.createOkResponseWithMessage(messages, 'Messages listed');
  }

  /** Delegates create flow to MessageService. */
  @Post()
  @ApiOperation({ summary: 'Create message + mock assistant reply (controller passthrough)' })
  @ApiBody({ type: CreateMessageRequest })
  createMessage(
    @Param('conversationId') conversationId: string,
    @Body() request: CreateMessageRequest,
  ) {
    const response = this.messageService.createMessage(conversationId, request);
    return this.createOkResponseWithMessage(response, 'Message flow simulated');
  }

  /** Delegates delete flow to MessageService. */
  @Delete(':messageId')
  @ApiOperation({ summary: 'Delete one message (controller passthrough)' })
  deleteMessage(
    @Param('conversationId') conversationId: string,
    @Param('messageId') messageId: string,
  ) {
    const response = this.messageService.deleteMessage(conversationId, messageId);
    return this.createOkResponseWithMessage(response, 'Message deleted');
  }
}
