import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthUser } from '../model/auth-user.interface';
import { AuthApiService } from './auth-api.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: AuthUser | null = null;

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly tokenStorageService: TokenStorageService,
    private readonly router: Router,
  ) {}

  login(username: string, password: string): Observable<boolean> {
    return this.authApiService.login(username, password).pipe(
      switchMap((tokens) => {
        this.tokenStorageService.setTokens(tokens);
        return this.loadCurrentUser();
      }),
      catchError(() => {
        this.currentUser = null;
        this.tokenStorageService.clear();
        return of(false);
      }),
    );
  }

  loadCurrentUser(): Observable<boolean> {
    if (!this.isLoggedIn()) {
      this.currentUser = null;
      return of(false);
    }

    return this.authApiService.getCurrentUser().pipe(
      map((user) => {
        this.currentUser = user;
        return true;
      }),
      catchError(() => {
        this.currentUser = null;
        return of(false);
      }),
    );
  }

  refreshAccessToken(): Observable<boolean> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return of(false);
    }

    return this.authApiService.refreshToken(refreshToken).pipe(
      map((response) => {
        this.tokenStorageService.setAccessToken(response.accessToken);
        return true;
      }),
      catchError(() => of(false)),
    );
  }

  logout(redirect = true): void {
    this.currentUser = null;
    this.tokenStorageService.clear();

    if (redirect) {
      this.router.navigate([environment.routeLogin]);
    }
  }

  isLoggedIn(): boolean {
    const accessToken = this.getAccessToken();
    return !!accessToken && !this.isTokenExpired(accessToken);
  }

  getAccessToken(): string | null {
    return this.tokenStorageService.getAccessToken();
  }

  getRefreshToken(): string | null {
    return this.tokenStorageService.getRefreshToken();
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  getDisplayName(): string {
    return this.currentUser?.displayName || 'Guest user';
  }

  getInitials(): string {
    const sourceName = this.getDisplayName().trim();

    if (!sourceName || sourceName.toLowerCase() === 'guest user') {
      return 'GU';
    }

    const parts = sourceName.split(/\s+/).slice(0, 2);
    return parts.map((part) => part[0]?.toUpperCase() || '').join('') || 'GU';
  }

  private isTokenExpired(token: string): boolean {
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
}
