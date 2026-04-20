import { ApiProperty } from '@nestjs/swagger';

export class AuthUserModel {
  @ApiProperty({ example: 'usr-1' })
  userId!: string;

  @ApiProperty({ example: 'carlos.gardel' })
  username!: string;

  @ApiProperty({ example: 'Carlos Gardel' })
  displayName!: string;
}
