import { AuthUser } from './auth-user.interface';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}
