import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { Logout } from 'src/shared/actions/auth.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    public translate: TranslateService,
    private alertCtrl: AlertController,
    public store: Store
  ) {}

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
          this.store.dispatch(new Logout());
        }
      }]
    });
    await confirmLogoutAlert.present();
  }

}
