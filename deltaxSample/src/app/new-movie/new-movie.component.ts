import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';

import { DataService } from './../data.service';

import { Movie } from './../movie';

import { Actor } from './../actor';

import { Producer } from './../producer';

import { KeysPipe } from './../keys.pipe';

import { FileValueAccessorDirective } from './../file-value-accessor.directive';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss']
})
export class NewMovieComponent implements OnInit {

  movie: Movie;
  existing: string;
  toUpload: null;
  path: '';

  actors: Array<Actor>;

  producers: Array<Producer>;

  movieForm: any;

  constructor(private _dataService : DataService) {
    this.movie = new Movie();
    this.movie.name = '';
    this.movie.yor = 2018;
    this.movie.poster = '';
    this.movie.producer = '';
    this.movie.actors = [];
    this.movie.plot = '';
   }

  ngOnInit() {
    this.movieForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$')]),
      yor: new FormControl('', [Validators.required, Validators.max(2099), Validators.min(1900)]),
      plot: new FormControl('', [Validators.required, Validators.minLength(50)]),
      file: new FormControl('', [Validators.required]),
      actors: new FormControl('', [Validators.required, Validators.minLength(1)]),
      producer: new FormControl('', [Validators.required, Validators.nullValidator])
    });

    this._dataService.getData('actors')
    .subscribe(res => {
      this.actors = res;
    });

    this._dataService.getData('producers')
    .subscribe(res => {
      this.producers = res;
    });
    console.log(this.movie);
  }

  componentSelector(entry, movie) {
    if (typeof movie[entry.key] === 'string' && entry.key ==='producer') {
      return 'select';
    } else if (typeof movie[entry.key] === 'string' && entry.key === 'poster') {
      return 'file';
    } else if (typeof movie[entry.key] === 'string' && entry.key === 'plot') {
      return 'textarea';
    } else if (typeof movie[entry.key] === 'number' && entry.key === 'yor') {
      return 'number';
    } else if (typeof movie[entry.key] === 'string' && entry.key !== 'producer') {
      return 'input';
    } else if (typeof movie[entry.key] === 'object') {
      return 'multiSelect';
    }
  }

  onChange(event) {
    console.log(event);
    let file = event.target.files[0];
    this.existing = this.movie.poster;
    this.toUpload = file;
    this.movie.poster = file.name;
  }

  submitForm() {
    console.log(this.movie);
    console.log(this.movieForm);
    console.log(this.movieForm.value);
  }

  resetForm() {
    this.movie.name = '';
    this.movie.yor = 2018;
    this.movie.poster = '';
    this.movie.producer = '';
    this.movie.actors = [];
    this.movie.plot = '';
  }
  
}
