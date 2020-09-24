import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from '../app/providers/auth.provider';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { AuthState } from '../shared/state/auth.state';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<any>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    public authProvider: AuthProvider,
    public router: Router,
    public menu: MenuController
  ) {
    this.initializeApp();
    this.localizeApplication();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.isAuthenticated$.subscribe(isAuthenticated => {
        isAuthenticated ? this.router.navigate(['home']) : this.router.navigate(['login']);
        this.menu.enable(isAuthenticated, 'menu');
      });
    });
  }

  localizeApplication() {
    const browserLanguage = this.translate.getBrowserLang();
    if (browserLanguage) {
      this.translate.setDefaultLang(browserLanguage);
    } else {
      this.translate.use('en');
    }
  }
}