import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, FormControlName, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ErrorStateMatcher } from '@angular/material/core';

import { DataService } from './../data.service';

import { Movie } from './../movie';

import { Actor } from './../actor';

import { Producer } from './../producer';

import { KeysPipe } from './../keys.pipe';

import { FileValueAccessorDirective } from './../file-value-accessor.directive';
import { ModalDialogComponent } from './../modal-dialog/modal-dialog.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.valid;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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

  matcher = new MyErrorStateMatcher();

  filteredProducers: Observable<string[]>;

  filteredActors: Observable<string[]>;

  producerName: Array<string>;
  actorName: Array<string>

  name = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$')]);
  yor = new FormControl('', [Validators.required, Validators.max(2099), Validators.min(1900)]);
  plot = new FormControl('', [Validators.required, Validators.minLength(50)]);
  file = new FormControl('', [Validators.required]);
  actor = new FormControl('', [Validators.required, Validators.minLength(1)]);
  producer = new FormControl('', [Validators.required, Validators.nullValidator]);

  constructor(private _dataService: DataService, public dialog: MatDialog) {
    this.movie = new Movie();
    this.movie.name = '';
    this.movie.yor = 2018;
    this.movie.poster = '';
    this.movie.producer = '';
    this.movie.actors = [];
    this.movie.plot = '';
  }

  ngOnInit() {

    this._dataService.getData('actors')
      .subscribe(res => {
        this.actors = res;
        let i = 0;
        this.actorName = [];
        for (let actor of this.actors) {
          this.actorName[i] = actor['name'].toUpperCase();
          i++;
        }
      });

    this._dataService.getData('producers')
      .subscribe(res => {
        this.producers = res;
        let i = 0;
        this.producerName = [];
        for (let producer of this.producers) {
          this.producerName[i] = producer['name'].toUpperCase();
          i++;
        }
        this.filteredProducers = this.producer.valueChanges
          .pipe(
            startWith(''),
            map(val => this.filterProducer(val))
          );
      });
  }

  filterProducer(val: string): string[] {
    return this.producerName.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  filterActor(val: string): string[] {
    return this.actorName.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  openDialog(nameArray, type): void {
    let dialogRef = this.dialog.open(ModalDialogComponent, {
      minWidth: '50vw',
      minHeight: '50vh',
      data: { nameArray: nameArray, type: type, value: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(type);
      if (type === 'actor' && result) {
        this.actorName[this.actorName.length] = result;
        this.movie.actors[this.movie.actors.length] = result;
      } else if (type === 'producer' && result) {
        this.producerName[this.producerName.length] = result;
        this.filteredProducers = this.producer.valueChanges
          .pipe(
            startWith(''),
            map(val => this.filterProducer(val))
          );

        this.movie.producer = result;
      }
    });
  }

  componentSelector(entry, movie) {
    if (typeof movie[entry.key] === 'string' && entry.key === 'producer') {
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

  onChange(event, form) {
    let file = event.target.files[0];
    if (file) {
      this.existing = this.movie.poster;
      this.toUpload = file;
      form.value.poster = file.name;
    } else {
      this.existing = '';
      this.toUpload = null;
      form.value.poster = '';
    }
  }

  addNewActor() {
    console.log(this.actors);
  }

  addNewProducer() {
    console.log(this.producers);
  }

  submitForm(form: NgForm) {
    if (!this.validateForm()) {
      console.log(this.movie);
      this._dataService.postData('movie', this.movie)
        .subscribe(res => {
          console.log(res);
          if (res.status === 200) {
            console.log('Hello');
          }
        });
    } else {
      console.log(this.validateForm());
    }
  }

  validateForm() {
    var invalidElements = document.getElementsByClassName('ng-invalid');
    if (invalidElements.length > 0) {
      invalidElements[0].scrollIntoView(true);
      return true;
    } else {
      return false;
    }
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
