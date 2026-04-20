import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseObject } from '../basic/response-object.model';
import { MessageModel } from './model/message.model';
import { MessageRole } from './model/message-role.enum';
import { CreateMessageRequest } from './request/create-message.request';

@ApiTags('messages')
@Controller('conversations/:conversationId/messages')
export class MessageController {
  private messageCounter = 4;

  private messages: MessageModel[] = [
    {
      messageId: 'msg-1',
      conversationId: 'conv-1',
      role: MessageRole.ASSISTANT,
      content: 'Welcome to UTNito API contract class.',
      createdAt: new Date().toISOString(),
    },
    {
      messageId: 'msg-2',
      conversationId: 'conv-1',
      role: MessageRole.USER,
      content: 'What should we build in class 12?',
      createdAt: new Date().toISOString(),
    },
    {
      messageId: 'msg-3',
      conversationId: 'conv-2',
      role: MessageRole.USER,
      content: 'Can we keep controller and service separate?',
      createdAt: new Date().toISOString(),
    },
    {
      messageId: 'msg-4',
      conversationId: 'conv-2',
      role: MessageRole.ASSISTANT,
      content: 'Yes. Class 12 is exactly for that separation.',
      createdAt: new Date().toISOString(),
    },
  ];

  /** Returns messages belonging to one conversation id. */
  @Get()
  @ApiOperation({ summary: 'List messages of one conversation' })
  listMessages(@Param('conversationId') conversationId: string): ResponseObject<MessageModel[]> {
    const conversationMessages = this.messages.filter((item) => item.conversationId === conversationId);

    return {
      success: true,
      responseMessage: {
        messageCode: '0000',
        message: 'Messages listed',
      },
      serverTime: new Date().toISOString(),
      data: conversationMessages,
    };
  }

  /** Creates a user message and a mock assistant reply. */
  @Post()
  @ApiOperation({ summary: 'Create a message and return mock assistant reply' })
  @ApiBody({ type: CreateMessageRequest })
  createMessage(
    @Param('conversationId') conversationId: string,
    @Body() request: CreateMessageRequest,
  ): ResponseObject<{ userMessage: MessageModel; assistantMessage: MessageModel }> {
    if (!request.content?.trim()) {
      throw new BadRequestException('Message content is required');
    }

    this.messageCounter += 1;

    const userMessage: MessageModel = {
      messageId: `msg-${this.messageCounter}`,
      conversationId,
      role: MessageRole.USER,
      content: request.content.trim(),
      createdAt: new Date().toISOString(),
    };

    this.messageCounter += 1;

    const assistantMessage: MessageModel = {
      messageId: `msg-${this.messageCounter}`,
      conversationId,
      role: MessageRole.ASSISTANT,
      content: `Mock assistant reply to: ${request.content.trim()}`,
      createdAt: new Date().toISOString(),
    };

    this.messages.push(userMessage);
    this.messages.push(assistantMessage);

    return {
      success: true,
      responseMessage: {
        messageCode: '0000',
        message: 'Message flow simulated',
      },
      serverTime: new Date().toISOString(),
      data: {
        userMessage,
        assistantMessage,
      },
    };
  }

  /** Deletes one message by id. */
  @Delete(':messageId')
  @ApiOperation({ summary: 'Delete one message' })
  deleteMessage(@Param('messageId') messageId: string): ResponseObject<{ deletedMessageId: string }> {
    const previousLength = this.messages.length;

    this.messages = this.messages.filter((item) => item.messageId !== messageId);

    if (this.messages.length === previousLength) {
      throw new NotFoundException('Message not found');
    }

    return {
      success: true,
      responseMessage: {
        messageCode: '0000',
        message: 'Message deleted',
      },
      serverTime: new Date().toISOString(),
      data: {
        deletedMessageId: messageId,
      },
    };
  }
}
