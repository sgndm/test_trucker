import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from 'selenium-webdriver/http';

const httpOptions = {
  // responseType: 'string'
}

const SERVER_URL = 'http://34.219.77.92:8080/truckerapp/api/';

@Injectable()
export class ApiServicesService {

  // access token
  public access_token = '';

  constructor(
    private http: HttpClient
  ) {
    this.access_token = localStorage.getItem('access_token')
   }

  // login function
  login(data):Observable<HttpResponse> {
    const formData: FormData = new FormData();
    formData.append('username', data.u);
    formData.append('password', data.p);

    const url = SERVER_URL + 'login';
    return this.http.post(url, {'username': data.u, 'password': data.p}, {observe:'response', responseType: 'text'})

  }

  // get user details 
  getDetailsSetHeader(token) {
    const url = SERVER_URL + 'web/current';
    return this.http.get(url, {headers: {'X-AUTH-TOKEN' : token}});
  }

  getDetails() {
    const url = SERVER_URL + 'web/current';
    return this.http.get(url);
  }

  // save acces token in local storage
  saveToLocalStorage(token) {
    // this.access_token = token;
    localStorage.setItem('access_token', token);
  }

  // clear local storage
  clearLocalStorage() {
    localStorage.removeItem('access_token');
    // this.access_token = '';
  }


}
