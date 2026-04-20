import { ApiProperty } from '@nestjs/swagger';

export class UpdateConversationTitleRequest {
  @ApiProperty({ example: 'Updated conversation title' })
  title!: string;
}
