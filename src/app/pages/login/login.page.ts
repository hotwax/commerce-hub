import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Login } from '../../../shared/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username;
  password;
  constructor(
    public translate: TranslateService,
    private store: Store
  ) {
      this.setDefaultCredentials();
  }

  ngOnInit() {
  }

  setDefaultCredentials() {
    this.username = 'kevin.jackson';
    this.password = 'hotwax@786';
  }

  login(username, password) {
    let params = { USERNAME: username, PASSWORD: password };
    this.store.dispatch(new Login(params));
  }

}