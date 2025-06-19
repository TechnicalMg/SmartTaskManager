import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token from localStorage (or any storage you are using)
    const token = localStorage.getItem('token');

    let authReq = req;

    console.log('🚀 Interceptor engaged for:', req.url);

    if (token) {
      // Clone and attach the token
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired or invalid, redirect to login
          alert('Session expired. Please login again.');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
