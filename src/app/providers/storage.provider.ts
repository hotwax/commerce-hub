import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageProvider {

  constructor() { }

  /* Set specific key in local storage */
  setLocalStorageItem(key: string, value: any, ) {
    this[key] = value;
    // Setting the value is done mostly done during initialization
    // So we can make it async.
    // We have also stored it locally and returned in getToken method
    // so there will not be any synchronization issues.
    return Promise.resolve().then(() => {
      localStorage.setItem(key, value);
    });
  }

  /* Get specific key in local storage */
  getLocalStorageItem(key: string) {
    if (!this[key]) {
      this[key] = localStorage.getItem(key);
    }
    return this[key];
  }

  /* Clear specific key value in local storage  */
  removeLocalStorageItem(key: string) {
    this[key] = undefined;
    localStorage.removeItem(key);
  }


  /* Clear all key value  in local storage  */
  removeAllLocalStorageItems() {
    localStorage.clear();
  }

}