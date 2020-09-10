import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageProvider } from '../../providers/storage.provider';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthProvider } from '../../providers/auth.provider';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  userProfile:any;
  constructor(
    public translate: TranslateService,
    private storageProvider: StorageProvider,
    public authProvider: AuthProvider,
    private alertCtrl: AlertController,
    public menu: MenuController,
    public router: Router
  ) {
    this.userProfile = JSON.parse(this.storageProvider.getLocalStorageItem('userProfile'))
  }

  ngOnInit() {
  }

  async logout() {
    const confirmLogoutAlert = await this.alertCtrl.create({
      header: this.translate.instant('Logout'),
      message: this.translate.instant('ConfirmLogout'),
      buttons: [{
        text: this.translate.instant('No')
      },
      {
        text: this.translate.instant('Yes'),
        handler: () => {
          this.authProvider.logout();
          this.router.navigate(['/']);
          this.menu.enable(this.authProvider.isAuthenticated(), 'menu');
        }
      }]
    });
    await confirmLogoutAlert.present();
  }

}
