import { ApiProperty } from '@nestjs/swagger';
import { AuthUserModel } from './auth-user.model';

export class AuthSessionModel {
  @ApiProperty({ example: 'mock-access-token' })
  accessToken!: string;

  @ApiProperty({ example: 'mock-refresh-token' })
  refreshToken!: string;

  @ApiProperty({ type: AuthUserModel })
  user!: AuthUserModel;
}
