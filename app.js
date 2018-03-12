'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
//const makesRouter = require('./routes');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const bodyParser = require('body-parser');

// logging middleware
app.use(morgan('dev'));

//serve up static files from a public folder
app.use(express.static(path.join(__dirname, '/public')));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// start the server
var server = app.listen(3000, function(){
  console.log('listening on port 3000');
});


// templating boilerplate setup
const env = nunjucks.configure('views', {noCache: true})
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when res.render works with html files, have it use nunjucks to do so

app.get('/', function(req, res, next) {
  res.render('index');
});
