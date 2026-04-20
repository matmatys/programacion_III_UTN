import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({ example: 'carlos.gardel' })
  username!: string;

  @ApiProperty({ example: '123456' })
  password!: string;
}
