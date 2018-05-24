const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

//Connection
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/deltax', (err, db) => {
    if (err) return console.log(err);

    closure(db);
  });
};

//Error Handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

//Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

//get Data
function getData(collectioName) {
  return new Promise((resolve, reject) => {
    connection((db) => {
      const dbName = db.db('deltax');
      dbName.collection(collectioName)
        .find()
        .toArray()
        .then((data) => {
          console.log(data[0].data);
          if (data[0].data.length > 0) {
            console.log('hello');
            resolve(data[0].data);
          } else {
            console.log('hello1');
            var error = {};
            error['message'] = 'data not found';
            error['status'] = 500;
            error['data'] = [];
            reject(error);
          }
        })
        .catch((err) => {
          console.log('hello2');
          reject(err);
        });
    });
  });
}

//Get actors
router.get('/actors', (req, res) => {
  getData('actors').then((data) => {
    console.log('actors');
    response.data = data;
    res.json(response);
  })
  .catch((err) => {
    console.log(err);
    res.status(err.status).send(err);
  });
});

//Get movies 
router.get('/movies', (req, res) => {
  getData('movies').then((data) => {
    response.data = data;
    res.json(response);
  })
  .catch((err) => {
    sendError(err, res);
  });
});

//Get producers 
router.get('/producers', (req, res) => {
  getData('producers').then((data) => {
    response.data = data;
    res.json(response);
  })
  .catch((err) => {
    sendError(err, res);
  });
});

//export
module.exports = router;
