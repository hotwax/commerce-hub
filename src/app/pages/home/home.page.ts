import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WidgetProvider } from './../../providers/widget.provider';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public translate: TranslateService,
    private widgetProvider: WidgetProvider
  ) {
  }

  ionViewWillEnter() {
    // Further we will call required API and dismiss the loader after getting the response
    this.widgetProvider.dismissLoader();
  }

}
