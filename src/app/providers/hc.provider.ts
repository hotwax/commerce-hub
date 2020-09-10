import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HcProvider {
  public baseUrl: string;
  constructor(private http: HttpClient) {
    if (environment.BASE_URL && environment.BASE_URL.trim() !== '') {
      this.baseUrl = environment.BASE_URL;
    }
  }

  callRequest(type, endPoint, params?) {
    let parameters = {};
    if(params) {
      parameters = type === 'post' ? { body: params, observe: 'response' } : { params: params }
    }
    return this.http.request(type, this.baseUrl + endPoint, parameters);
  }

}