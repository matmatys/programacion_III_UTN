import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly authUrls = ['/auth/login', '/auth/refresh-token'];

  constructor(private readonly authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const skipAuth = this.authUrls.some((url) => request.url.includes(url));
    const accessToken = this.authService.getAccessToken();

    if (skipAuth || !accessToken) {
      return next.handle(request);
    }

    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return next.handle(authRequest);
  }
}
