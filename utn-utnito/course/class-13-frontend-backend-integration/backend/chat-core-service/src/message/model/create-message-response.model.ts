import { ApiProperty } from '@nestjs/swagger';
import { MessageModel } from './message.model';

export class CreateMessageResponseModel {
  @ApiProperty({ type: MessageModel })
  userMessage: MessageModel;

  @ApiProperty({ type: MessageModel })
  assistantMessage: MessageModel;

  constructor(userMessage: MessageModel, assistantMessage: MessageModel) {
    this.userMessage = userMessage;
    this.assistantMessage = assistantMessage;
  }
}
