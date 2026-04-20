import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AbstractController } from '../basic/abstract.controller';
import { AuthSessionModel } from './model/auth-session.model';
import { AuthUserModel } from './model/auth-user.model';
import { LoginRequest } from './request/login.request';

@ApiTags('auth')
@Controller('auth')
export class AuthController extends AbstractController {
  private readonly validUsername = 'carlos.gardel';
  private readonly validPassword = '123456';

  /** Authenticates a user with demo credentials. */
  @Post('login')
  @ApiOperation({ summary: 'Login contract endpoint' })
  @ApiBody({ type: LoginRequest })
  login(@Body() request: LoginRequest) {
    const username = request.username?.trim().toLowerCase();
    const password = request.password?.trim();

    if (username !== this.validUsername || password !== this.validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user: AuthUserModel = {
      userId: 'usr-1',
      username: this.validUsername,
      displayName: 'Carlos Gardel',
    };

    const session: AuthSessionModel = {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user,
    };

    return this.createOkResponseWithMessage(session, 'Login successful');
  }
}
