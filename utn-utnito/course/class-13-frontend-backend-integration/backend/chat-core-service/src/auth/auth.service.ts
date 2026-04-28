import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthSessionModel } from './model/auth-session.model';
import { AuthUserModel } from './model/auth-user.model';
import { LoginRequest } from './request/login.request';

@Injectable()
export class AuthService {
  private readonly validUsername = 'carlos.gardel';
  private readonly validPassword = '123456';

  login(request: LoginRequest): AuthSessionModel {
    const username = request.username?.trim().toLowerCase();
    const password = request.password?.trim();

    if (username !== this.validUsername || password !== this.validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = new AuthUserModel('usr-1', this.validUsername, 'Carlos Gardel');

    return new AuthSessionModel('mock-access-token', 'mock-refresh-token', user);
  }
}
