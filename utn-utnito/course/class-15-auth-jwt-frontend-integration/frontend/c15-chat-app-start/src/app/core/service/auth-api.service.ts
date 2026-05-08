import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthSession } from '../model/auth-session.interface';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  login(username: string, password: string): Observable<AuthSession> {
    return this.post<AuthSession>('auth/login', { username, password }).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.responseMessage?.message || 'Login failed');
        }

        return response.data;
      }),
    );
  }
}
