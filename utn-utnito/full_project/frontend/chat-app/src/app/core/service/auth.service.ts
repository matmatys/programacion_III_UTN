import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthTokens } from '../model/auth-tokens.interface';
import { AuthUser } from '../model/auth-user.interface';
import { BaseApiService } from './base-api.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {
  constructor(
    http: HttpClient,
    private readonly tokenStorageService: TokenStorageService,
    private readonly router: Router,
  ) {
    super(http);
  }

  login(username: string, password: string): Observable<AuthTokens> {
    return this.post<AuthTokens>('auth/login', { username, password }).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Login failed');
        }

        this.tokenStorageService.setTokens(response.data);
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

        this.tokenStorageService.setAccessToken(response.data.accessToken);
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

  getAccessToken(): string | null {
    return this.tokenStorageService.getAccessToken();
  }

  getRefreshToken(): string | null {
    return this.tokenStorageService.getRefreshToken();
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string | null): boolean {
    if (!token) {
      return true;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiresAt = payload?.exp;

      if (!expiresAt) {
        return true;
      }

      return Math.floor(Date.now() / 1000) >= expiresAt;
    } catch {
      return true;
    }
  }

  logout(redirect = true): void {
    this.tokenStorageService.clear();

    if (redirect) {
      this.router.navigate([environment.routeLogin]);
    }
  }
}
