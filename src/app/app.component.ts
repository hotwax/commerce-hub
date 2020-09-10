import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from '../app/providers/auth.provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    public authProvider: AuthProvider,
    public router: Router,
  ) {
    this.initializeApp();
    this.localizeApplication();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.authProvider.isAuthenticated()) {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['login']);
      }
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