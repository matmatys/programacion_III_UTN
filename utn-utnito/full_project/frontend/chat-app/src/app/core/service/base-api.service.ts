import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponseObject } from '../model/response-object.interface';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  protected readonly apiUrl = environment.coreServiceUrl;

  constructor(protected readonly http: HttpClient) {}

  protected get<T>(path: string, params?: Record<string, unknown>): Observable<ResponseObject<T>> {
    return this.http.get<ResponseObject<T>>(`${this.apiUrl}/${path}`, {
      params: this.buildHttpParams(params),
    });
  }

  protected post<T>(path: string, body: unknown): Observable<ResponseObject<T>> {
    return this.http.post<ResponseObject<T>>(`${this.apiUrl}/${path}`, body);
  }

  protected patch<T>(path: string, body: unknown): Observable<ResponseObject<T>> {
    return this.http.patch<ResponseObject<T>>(`${this.apiUrl}/${path}`, body);
  }

  private buildHttpParams(params?: Record<string, unknown>): HttpParams {
    let httpParams = new HttpParams();

    if (!params) {
      return httpParams;
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        return;
      }

      httpParams = httpParams.set(key, String(value));
    });

    return httpParams;
  }
}
