import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {inject} from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  console.log(request.url);
  const authService = inject(AuthService)
  const token = authService.getToken();
  if (token) {
    request = request.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`,
      }
    });
  }
  return next(request);
};