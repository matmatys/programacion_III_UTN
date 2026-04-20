import { ApiProperty } from '@nestjs/swagger';

export class DemoMessage {
  @ApiProperty({ example: 'msg-1' })
  id!: string;

  @ApiProperty({ example: 'Hola clase 11' })
  content!: string;

  @ApiProperty({ example: 'Carlos Gardel' })
  name!: string;
}
