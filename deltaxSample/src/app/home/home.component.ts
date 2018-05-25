import { Component, OnInit } from '@angular/core';

import { DataService } from './../data.service';

import { Movie } from './../movie';

import { ShareDataService } from './../share-data.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movieList: Array<Movie>;

  constructor(private _dataService : DataService, private _shareData: ShareDataService, private router: Router) {
    //fetch movie list from server
    this._dataService.getData('movies')
    .subscribe(res => {
      this.movieList = res;
    });
  }

  ngOnInit() {
    this._shareData.clearData();
  }

  editMovie(movie) {
    console.log(movie)
    this._shareData.sendData(movie);
    this.router.navigateByUrl('/newMovie');
  }

}
