import { Component, OnInit } from '@angular/core';

import { DataService } from './../data.service';

import { Movie } from './../movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movieList: Array<Movie>;

  constructor(private _dataService : DataService) {
    //fetch movie list from server
    this._dataService.getData('movies')
    .subscribe(res => {
      this.movieList = res;
    });
  }

  ngOnInit() {
  }

}
