import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WidgetProvider {
  isLoading;
  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {
    this.isLoading = false;
   }
  /*
  * @method showToast : Call when display any info using Toast.
  * @param msg = String
  */
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  /*
   * @method presentLoader : Call when any API call is executing.
   * @param  msg : String pass as a msg.
   * Reference: https://stackoverflow.com/questions/52574448/ionic-4-loading-controller-dismiss-is-called-before-present-which-will-ke
   */
  async presentLoader(msg) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: msg,
    }).then(loader => {
      loader.present().then(() => {
        if (!this.isLoading) {
          loader.dismiss();
        }
      });
    });
  }
  /*
   * @method dismissLoader : Call when any API call completed its execution.
   */
  async dismissLoader() {
    this.isLoading = false;
    while (await this.loadingController.getTop() !== undefined) {
      return await this.loadingController.dismiss();
    }
  }

  setAutoFocus(el) {
    // Initially the focus in just blink hence added setTimeout to make it stable
    setTimeout(() => {
      el.setFocus();
    }, 500);
  }

}