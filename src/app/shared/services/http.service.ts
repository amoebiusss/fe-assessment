import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private readonly http: HttpClient) {}

  get<T>(url: string, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<T> {
    return this.http.get<T>(url, { ...options, headers: this.defaultHeaders })
      .pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: string, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.post<T>(url, body, { ...options, headers: this.defaultHeaders })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(`Error ${error.status}): ${error.message}`));
  }
}