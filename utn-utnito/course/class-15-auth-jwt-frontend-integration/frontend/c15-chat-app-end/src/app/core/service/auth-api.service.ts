import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthTokens } from '../model/auth-tokens.interface';
import { AuthUser } from '../model/auth-user.interface';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  login(username: string, password: string): Observable<AuthTokens> {
    return this.post<AuthTokens>('auth/login', { username, password }).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Login failed');
        }

        return response.data;
      }),
    );
  }

  refreshToken(refreshToken: string): Observable<{ accessToken: string; expiresIn: number }> {
    return this.post<{ accessToken: string; expiresIn: number }>('auth/refresh-token', {
      refreshToken,
    }).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Refresh token failed');
        }

        return response.data;
      }),
    );
  }

  getCurrentUser(): Observable<AuthUser> {
    return this.get<AuthUser>('auth/me').pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Failed to load current user');
        }

        return response.data;
      }),
    );
  }
}
