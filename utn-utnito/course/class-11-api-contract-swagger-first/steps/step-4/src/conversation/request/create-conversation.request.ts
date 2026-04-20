import { ApiProperty } from '@nestjs/swagger';

export class CreateConversationRequest {
  @ApiProperty({ example: 'New conversation title' })
  title!: string;
}
