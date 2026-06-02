import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../service/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  canActivate(): boolean | UrlTree {
    // Allow navigation when session has a valid access token.
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Clear local auth state and redirect to login.
    this.authService.logout(false);
    return this.router.parseUrl(`/${environment.routeLogin}`);
  }
}
