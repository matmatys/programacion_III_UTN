import { ApiProperty } from '@nestjs/swagger';

export class ResponseMessage {
  @ApiProperty({ example: '0000' })
  messageCode!: string;

  @ApiProperty({ example: 'OK' })
  message!: string;

  constructor(messageCode: string, message: string) {
    this.messageCode = messageCode;
    this.message = message;
  }
}
