import { Injectable } from '@angular/core';
import { AuthUser } from '../model/auth-user.interface';
import { MockBackendService } from './mock-backend.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: AuthUser | null = null;

  constructor(private readonly mockBackendService: MockBackendService) {}

  login(username: string, password: string): boolean {
    const user = this.mockBackendService.authenticate(username, password);

    if (!user) {
      this.currentUser = null;
      return false;
    }

    this.currentUser = user;
    return true;
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
