import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '../basic/response-message.model';
import { ResponseObject } from '../basic/response-object.model';
import { DemoMessage } from './model/demo-message.model';
import { CreateDemoMessageRequest } from './request/create-demo-message.request';
import { UpdateDemoMessageRequest } from './request/update-demo-message.request';

@ApiTags('demo-messages')
@Controller('demo-messages')
export class DemoMessagesController {
  private nextId = 3;

  private messages: DemoMessage[] = [
    { id: 'msg-1', content: 'Welcome to class 11 demo.', name: 'Carlos Gardel' },
    { id: 'msg-2', content: 'Try POST, PATCH and DELETE from Swagger.', name: 'Matias' },
  ];

  /** Returns all demo messages. */
  @Get()
  @ApiOperation({ summary: 'GET - List all messages' })
  listMessages(): ResponseObject<DemoMessage[]> {
    return new ResponseObject(
      true,
      new ResponseMessage('0000', 'Messages listed'),
      new Date().toISOString(),
      this.messages,
    );
  }

  /** Creates one demo message from content and name. */
  @Post()
  @ApiOperation({ summary: 'POST - Create a message' })
  @ApiBody({ type: CreateDemoMessageRequest })
  createMessage(@Body() request: CreateDemoMessageRequest): ResponseObject<DemoMessage> {
    if (!request.content?.trim() || !request.name?.trim()) {
      throw new BadRequestException('Content and name are required');
    }

    const message: DemoMessage = {
      id: `msg-${this.nextId}`,
      content: request.content.trim(),
      name: request.name.trim(),
    };

    this.nextId += 1;
    this.messages.unshift(message);

    return new ResponseObject(
      true,
      new ResponseMessage('0000', 'Message created'),
      new Date().toISOString(),
      message,
    );
  }

  /** Updates only the fields sent in the request body. */
  @Patch(':messageId')
  @ApiOperation({ summary: 'PATCH - Update part of one message' })
  @ApiBody({ type: UpdateDemoMessageRequest })
  updateMessage(
    @Param('messageId') messageId: string,
    @Body() request: UpdateDemoMessageRequest,
  ): ResponseObject<DemoMessage> {
    const message = this.messages.find((item) => item.id === messageId);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    // If content and name are empty we throw an error - at least one field is required
    if (!request.content && !request.name) {
      throw new BadRequestException('At least one field is required');
    }

    if (request.content) {
      message.content = request.content.trim();
    }

    if (request.name) {
      message.name = request.name.trim();
    }

    return new ResponseObject(
      true,
      new ResponseMessage('0000', 'Message updated (PATCH)'),
      new Date().toISOString(),
      message,
    );
  }

  /** Replaces full editable data of a demo message. */
  @Put(':messageId')
  @ApiOperation({ summary: 'PUT - Replace full message (content + name)' })
  @ApiBody({ type: CreateDemoMessageRequest })
  replaceMessage(
    @Param('messageId') messageId: string,
    @Body() request: CreateDemoMessageRequest,
  ): ResponseObject<DemoMessage> {
    const message = this.messages.find((item) => item.id === messageId);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    // If content or name are empty we throw an error - both fields are required
    if (!request.content?.trim() || !request.name?.trim()) {
      throw new BadRequestException('Content and name are required');
    }

    message.content = request.content.trim();
    message.name = request.name.trim();

    return new ResponseObject(
      true,
      new ResponseMessage('0000', 'Message replaced (PUT)'),
      new Date().toISOString(),
      message,
    );
  }

  /** Deletes one demo message by id. */
  @Delete(':messageId')
  @ApiOperation({ summary: 'DELETE - Remove one message' })
  deleteMessage(@Param('messageId') messageId: string): ResponseObject<{ deletedMessageId: string }> {
    const previousLength = this.messages.length;

    // filter keeps only elements where the condition is true
    // here: keep all messages whose id is NOT the one we want to delete
    this.messages = this.messages.filter((item) => item.id !== messageId);

    if (this.messages.length === previousLength) {
      throw new NotFoundException('Message not found');
    }

    return new ResponseObject(
      true,
      new ResponseMessage('0000', 'Message deleted'),
      new Date().toISOString(),
      {
        deletedMessageId: messageId,
      },
    );
  }
}
