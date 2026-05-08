import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthUser } from '../model/auth-user.interface';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: AuthUser | null = null;

  constructor(private readonly authApiService: AuthApiService) {}

  login(username: string, password: string): Observable<boolean> {
    return this.authApiService.login(username, password).pipe(
      map((session) => {
        this.currentUser = session.user;
        return true;
      }),
      catchError(() => {
        this.currentUser = null;
        return of(false);
      }),
    );
  }

  logout(): void {
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
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
}
