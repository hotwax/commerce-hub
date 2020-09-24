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
import { Injectable } from '@angular/core';
import { StatusCodes } from 'http-status-codes';
import { Store, Select } from '@ngxs/store';
import { Logout } from 'src/shared/actions/auth.actions';
import { AuthState } from '../../shared/state/auth.state';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  @Select(AuthState.token) token$: Observable<any>;
  private authenticationToken: string;
  constructor(
    private store: Store
  ) {
    this.token$.subscribe(token => {
      this.authenticationToken = token;
    });
  }
  /**
   * @param request : Request data
   * @param next :Handler
   * It is HTTPINTERCEPTOR method
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationToken) {
      request = request.clone({
        headers: request.headers.set('Authorization','Bearer '+ this.authenticationToken)
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
          this.store.dispatch(new Logout());
        }
        return throwError(error);
      }), finalize(() => {
    }));
  }
}