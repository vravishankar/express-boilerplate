const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const db = require('./config/db');

const app = express();

var mongodb;

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = 8000;

MongoClient.connect(db.url, (err, db) => {

    assert.equal(null, err);
    //require('./app/routes')(app, db)
    mongodb = db;

    app.listen(port, () => {
        console.log(`Server Listening on Port ${port}`);
    });
})


console.log(mongodb);