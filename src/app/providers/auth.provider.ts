import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageProvider } from '../providers/storage.provider';
import { HcProvider } from '../providers/hc.provider';

@Injectable({
    providedIn: 'root'
})
export class AuthProvider {
  public baseUrl: string;

  constructor(
    private hcProvider: HcProvider,
    private storageProvider: StorageProvider
  ) {
    if (environment.BASE_URL && environment.BASE_URL.trim() !== '') {
      this.baseUrl = environment.BASE_URL;
    }
  }

  // Login user into the application
  public login(username: string, password: string): any {
    let params = { 'USERNAME': username, 'PASSWORD': password }
    return new Promise((resolve, reject) => {
      this.hcProvider.callRequest('post', 'login', params).subscribe((data: any) => {
        if (data.body && data.body.token) {
          this.storageProvider.setLocalStorageItem('token', data.body.token);
           resolve(true);
        }
        resolve(false);
      }, (err) => {
          reject(err);
        });
    });
  }

  // get authentication token
  public getToken() {
    return this.storageProvider.getLocalStorageItem('token');
  }

  // logout user from the application
  public logout() {
    this.storageProvider.removeLocalStorageItem('token');
    this.storageProvider.removeAllLocalStorageItems();
  }

  // Check if user is authenticated
  public isAuthenticated() {
    const token = this.storageProvider.getLocalStorageItem('token');
    return token !== undefined && token !== null;
  }
}