import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AuthStateModel } from '../../models/auth.model';
import { Login, Logout } from '../actions/auth.actions';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../../app/providers/auth.provider';
import { HttpResponse } from '@angular/common/http';
import { WidgetProvider } from '../../app/providers/widget.provider';
import { TranslateService } from '@ngx-translate/core';
import { StatusCodes } from 'http-status-codes';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(
    private authProvider: AuthProvider,
    private widget: WidgetProvider,
    private translate: TranslateService,
  ) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    this.widget.presentLoader('');
    return this.authProvider.login(action.payload).pipe(
      tap(
        (response: HttpResponse<any>) => {
          if(response.body.token) {
            // The loader will be dismissed on home page after getting data from API
            ctx.patchState({
              token: response.body.token,
            });
          } else {
              this.widget.dismissLoader();
              this.widget.showToast(this.translate.instant('InvalidLoginCredentialError'));
          }
        },
        err => {
          if (err.status === StatusCodes.UNAUTHORIZED) {
            this.widget.showToast(this.translate.instant('LoginFailedError'));
          }
          if (err.status === StatusCodes.BAD_REQUEST) {
            this.widget.showToast(this.translate.instant('InvalidLoginCredentialError'));
          }
          if (err.status === StatusCodes.NOT_FOUND) {
            this.widget.showToast(this.translate.instant('SomethingWentWrong'));
          }
          this.widget.dismissLoader();
        },
      ),
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      token: null,
    });
  }

}