import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthProvider } from '../../providers/auth.provider';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(public authProvider: AuthProvider) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    return this.authProvider.isAuthenticated();
  }
}
