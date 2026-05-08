import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Auth endpoints should not receive Bearer headers from this interceptor.
  private readonly authUrls = ['/auth/login', '/auth/refresh-token'];

  constructor(private readonly authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Skip token injection for login/refresh requests.
    const skipAuth = this.authUrls.some((url) => request.url.includes(url));
    const accessToken = this.authService.getAccessToken();

    if (skipAuth || !accessToken) {
      // next.handle(...) sends the request to the next HTTP handler without changes.
      return next.handle(request);
    }

    // Clone request and attach Authorization header for protected endpoints.
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // next.handle(...) continues the HTTP chain with the modified request.
    return next.handle(authRequest);
  }
}
