# deltaxSampleQ

About

This project is a sample website for Deltax sample assignment.
Aim is to create a imdb like website which would list movies. User can add new movies or update the existing one.

Movie contains : title, year or release (yor), producer, actors, plot and poster.

Technology used: 
  Angular 5 MEAN stack
  Material library is used for components
  MongoDb for database
  Gulp for Task Runner

Validations: 
  Adding new movie:
    Name takes space, a-z, and numeric data as input.
    year of release is a number ranging from 1900 to 2099
    poster is file.
    plot should have minimum length of 50 chars.
    Only one producer can be selected for a movie.
    Multiple actors present in movie.
  
  Adding new Actor and Producer:
    User can add new actor or producer if it can't find it in the existing list in a new pop up.
    sex is male female or other
    DOB is string selectbale from calender
    Bio is can have minimum 50 chars.

Known Issues:
  DOB can be greater than current date.
  Poster fileupload is pending.


Prerequisite:

node js and mongodb is required to be pre installed
then clone this project. cd to deltaxSample
run npm install -g gulp
run npm install

run gulp run-dev

in a separate terminal in the same folder
run mongodb --dbpath=data

  




