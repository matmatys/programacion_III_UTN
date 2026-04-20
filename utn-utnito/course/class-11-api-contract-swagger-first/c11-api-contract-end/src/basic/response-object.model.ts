import { ApiProperty } from '@nestjs/swagger';
import { ResponseMessage } from './response-message.model';

export class ResponseObject<T = unknown> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ type: ResponseMessage })
  responseMessage: ResponseMessage;

  @ApiProperty({ example: '2026-04-19T00:00:00.000Z' })
  serverTime: string;

  @ApiProperty({ required: false, description: 'Contract payload' })
  data: T;

  constructor(success: boolean, responseMessage: ResponseMessage, serverTime: string, data: T) {
    this.success = success;
    this.responseMessage = responseMessage;
    this.serverTime = serverTime;
    this.data = data;
  }
}
