import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponseObject } from '../basic/response-object.interface';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  protected readonly apiUrl = environment.coreServiceUrl;

  constructor(protected readonly http: HttpClient) {}

  protected get<T>(path: string): Observable<ResponseObject<T>> {
    return this.http.get<ResponseObject<T>>(`${this.apiUrl}/${path}`);
  }

  protected post<T>(path: string, body: unknown): Observable<ResponseObject<T>> {
    return this.http.post<ResponseObject<T>>(`${this.apiUrl}/${path}`, body);
  }

  protected patch<T>(path: string, body: unknown): Observable<ResponseObject<T>> {
    return this.http.patch<ResponseObject<T>>(`${this.apiUrl}/${path}`, body);
  }
}
