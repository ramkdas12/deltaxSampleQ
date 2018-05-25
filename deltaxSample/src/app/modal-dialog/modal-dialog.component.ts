import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from './../data.service';
import { FormControl, FormGroup, Validators, FormGroupDirective, FormControlName, NgForm, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

import { Actor } from './../actor';

import { Producer } from './../producer';

import { KeysPipe } from './../keys.pipe';

import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.valid;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export function forbiddenNameValidator(nameRe: Array<string>): ValidatorFn {
  return (control: FormControl): {[key: string]: any} => {
    const forbidden = nameRe.indexOf(control.value.toUpperCase());
    return (forbidden > -1) ? {'forbiddenName': {value: control.value}} : null;
  };
} 

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent {

  formData: Actor;

  matcher = new MyErrorStateMatcher();

  name = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$'), forbiddenNameValidator(this.data.nameArray)]);
  bio = new FormControl('', [Validators.required, Validators.minLength(50)]);
  dob = new FormControl('', [Validators.required]);
  sex = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _dataService: DataService) {
    if (data.type === 'actor') {
      this.formData = new Actor();
    } else {
      this.formData = new Producer();
    }
    this.formData.name = '';
    this.formData.sex = '';
    this.formData.dob = '';
    this.formData.bio = '';
  }

  submitForm() {
    this.data.value = this.formData.name.toUpperCase();
    if (!this.validateForm()) {
      this._dataService.postData(this.data.type, this.formData)
        .subscribe(res => {
          console.log(res);
          if (res.status === 200) {
            this.dialogRef.close(this.data.value);
          }
        });
    } else {
      console.log('form Invalid');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  componentSelector(entry, formData) {
    if (typeof formData[entry.key] === 'string' && entry.key === 'sex') {
      return 'radio';
    } else if (typeof formData[entry.key] === 'string' && entry.key === 'dob') {
      return 'date';
    } else if (typeof formData[entry.key] === 'string' && entry.key === 'bio') {
      return 'textarea';
    } else {
      return 'input';
    }
  }

  validateForm() {
    var modal = document.getElementsByClassName('mat-dialog-container');
    var invalidElements = modal[0].getElementsByClassName('ng-invalid');
    if (invalidElements.length > 0) {
      invalidElements[0].scrollIntoView(true);
      return true;
    } else {
      return false;
    }
  }

}
