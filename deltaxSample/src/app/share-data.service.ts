import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShareDataService {

  private sharedData = null;

  sendData(message: any) {
    console.log(message);
    this.sharedData = message; 
  }

  clearData() {
    this.sharedData = null; 
  }

  getData() {
    console.log(this.sharedData);
    return this.sharedData;
  }

}
