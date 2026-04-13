import { Injectable } from '@angular/core';
import { AuthTokens } from '../model/auth-tokens.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private readonly accessTokenKey = 'utnito_access_token';
  private readonly refreshTokenKey = 'utnito_refresh_token';

  setTokens(tokens: AuthTokens): void {
    sessionStorage.setItem(this.accessTokenKey, tokens.accessToken);
    sessionStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
  }

  setAccessToken(accessToken: string): void {
    sessionStorage.setItem(this.accessTokenKey, accessToken);
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem(this.refreshTokenKey);
  }

  clear(): void {
    sessionStorage.removeItem(this.accessTokenKey);
    sessionStorage.removeItem(this.refreshTokenKey);
  }
}
