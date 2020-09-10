import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { map, catchError, finalize } from 'rxjs/operators';
  import { Router } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { StorageProvider } from '../providers/storage.provider';
  import { StatusCodes } from 'http-status-codes';

  @Injectable()
  export class TokenInterceptor implements HttpInterceptor {
  constructor(
        private router: Router,
        private storageProvider: StorageProvider) { }
    /**
     * @param request : Request data
     * @param next :Handler
     * It is HTTPINTERCEPTOR method
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storageProvider.getLocalStorageItem('token');
        if (token) {
            request = request.clone({
              headers: request.headers.set('Authorization','Bearer '+ token)
                .append('Content-Type', 'application/json').append('Accept', 'application/json')
            });
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // TODO
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
              if (error.status === StatusCodes.UNAUTHORIZED) {
                this.storageProvider.removeLocalStorageItem('token');
                this.router.navigate(['/']);
              }
              return throwError(error);
            }), finalize(() => {
            }));
    }
  }