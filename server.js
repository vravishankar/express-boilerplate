const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');

const app = express();

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = 8000;

MongoClient.connect(db.url, (err, db) => {

    require('./app/routes')(app, db)

    app.listen(port, () => {
        console.log(`Server Listening on Port ${port}`);
    });
})