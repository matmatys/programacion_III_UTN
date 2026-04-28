import { ApiProperty } from '@nestjs/swagger';

export class UpdateConversationTitleRequest {
  @ApiProperty({ example: 'Renamed conversation title' })
  title!: string;
}
