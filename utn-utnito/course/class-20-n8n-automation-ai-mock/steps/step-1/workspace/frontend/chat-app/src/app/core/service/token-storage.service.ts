import { Injectable } from '@angular/core';
import { AuthTokens } from '../model/auth-tokens.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  // Keys used to store tokens in sessionStorage.
  private readonly accessTokenKey = 'utnito_access_token';
  private readonly refreshTokenKey = 'utnito_refresh_token';

  setTokens(tokens: AuthTokens): void {
    // Save both tokens after successful login.
    sessionStorage.setItem(this.accessTokenKey, tokens.accessToken);
    sessionStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
  }

  setAccessToken(accessToken: string): void {
    // Update only access token after refresh.
    sessionStorage.setItem(this.accessTokenKey, accessToken);
  }

  getAccessToken(): string | null {
    // Read current access token from browser session storage.
    return sessionStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    // Read current refresh token from browser session storage.
    return sessionStorage.getItem(this.refreshTokenKey);
  }

  clear(): void {
    // Remove both tokens when user logs out or auth fails.
    sessionStorage.removeItem(this.accessTokenKey);
    sessionStorage.removeItem(this.refreshTokenKey);
  }
}
