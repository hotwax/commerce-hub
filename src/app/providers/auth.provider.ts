import { Injectable } from '@angular/core';
import { HcProvider } from './hc.provider';

@Injectable()
export class AuthProvider {

  constructor(private hcProvider: HcProvider) {}

  login(payload) {
    return this.hcProvider.callRequest('post', 'login', payload);
  }

}
