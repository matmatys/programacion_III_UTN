import { ApiProperty } from '@nestjs/swagger';

export abstract class AbstractBasicChatObject {
  @ApiProperty({ example: '2026-04-19T00:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-04-19T00:00:00.000Z' })
  updatedAt: string;

  constructor(createdAt: string, updatedAt: string) {
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
