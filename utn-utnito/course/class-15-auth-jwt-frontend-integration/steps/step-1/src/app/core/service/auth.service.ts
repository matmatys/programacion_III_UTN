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
  // In-memory user used by UI (name, initials, etc.).
  private currentUser: AuthUser | null = null;

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly tokenStorageService: TokenStorageService,
    private readonly router: Router,
  ) {}

  login(username: string, password: string): Observable<boolean> {
    // 1) Login, 2) save tokens, 3) load profile.
    return this.authApiService.login(username, password).pipe(
      switchMap((tokens) => {
        this.tokenStorageService.setTokens(tokens);
        return this.loadCurrentUser();
      }),
      // Any error clears local auth state.
      catchError(() => {
        this.currentUser = null;
        this.tokenStorageService.clear();
        return of(false);
      }),
    );
  }

  loadCurrentUser(): Observable<boolean> {
    // Avoid profile call when there is no valid access token.
    if (!this.isLoggedIn()) {
      this.currentUser = null;
      return of(false);
    }

    return this.authApiService.getCurrentUser().pipe(
      map((user) => {
        // Save profile used by chat header/sidebar.
        this.currentUser = user;
        return true;
      }),
      catchError(() => {
        // Invalid/expired token -> keep app unauthenticated.
        this.currentUser = null;
        return of(false);
      }),
    );
  }

  logout(redirect = true): void {
    // Local logout only: clear user and tokens.
    this.currentUser = null;
    this.tokenStorageService.clear();

    if (redirect) {
      this.router.navigate([environment.routeLogin]);
    }
  }

  isLoggedIn(): boolean {
    // User is logged in only if token exists and is not expired.
    const accessToken = this.getAccessToken();
    return !!accessToken && !this.isTokenExpired(accessToken);
  }

  getAccessToken(): string | null {
    return this.tokenStorageService.getAccessToken();
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
      // JWT payload is the second part: header.payload.signature
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
