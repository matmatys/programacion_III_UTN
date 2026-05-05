import { ApiProperty } from '@nestjs/swagger';

export class AuthUserModel {
  @ApiProperty({ example: 'usr-1' })
  userId: string;

  @ApiProperty({ example: 'carlos.gardel' })
  username: string;

  @ApiProperty({ example: 'Carlos Gardel' })
  displayName: string;

  @ApiProperty({ example: 'student' })
  role: string;

  constructor(userId: string, username: string, displayName: string, role = 'student') {
    this.userId = userId;
    this.username = username;
    this.displayName = displayName;
    this.role = role;
  }
}
