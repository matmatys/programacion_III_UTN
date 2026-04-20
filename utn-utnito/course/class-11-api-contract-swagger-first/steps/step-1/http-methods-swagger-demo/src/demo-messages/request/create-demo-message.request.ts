import { ApiProperty } from '@nestjs/swagger';

export class CreateDemoMessageRequest {
  @ApiProperty({ example: 'Hola clase 11' })
  content!: string;

  @ApiProperty({ example: 'Carlos Gardel' })
  name!: string;
}
