import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

//import services
import { DataService } from './data.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { KeysPipe } from './keys.pipe';
import { FileValueAccessorDirective } from './file-value-accessor.directive';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'newMovie',
    component: NewMovieComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NewMovieComponent,
    KeysPipe,
    FileValueAccessorDirective
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
