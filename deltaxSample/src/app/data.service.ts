import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result: any;

  constructor(private _http: Http) { }

  getData(url) {
    return this._http.get('/api/'+ url)
      .map(response => this.result = response.json().data);
  }

  postData(url, data) {
    return this._http.post('/api/add'+ url, data)
      .map(response => this.result = response.json());
  }

}
