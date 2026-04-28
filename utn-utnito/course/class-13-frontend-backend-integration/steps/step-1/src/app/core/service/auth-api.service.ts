import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthSession } from '../model/auth-session.interface';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  login(_username: string, _password: string): Observable<AuthSession> {
    return throwError(() => new Error('Step 1 skeleton: implement login in step 2'));
  }
}
