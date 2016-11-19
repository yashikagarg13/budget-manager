var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var cors = require("cors");

var jwt = require("jsonwebtoken");
var config = require('./config');

var setup = require('./api/setup');
var authenticate = require('./api/authenticate');
var expenseEntries = require('./api/expenseEntries');
var expenseCategories= require('./api/expenseCategories');
var users = require('./api/users');
var signup = require('./api/signup');

var port = process.env.PORT || 8080;
mongoose.Promise = global.Promise;
mongoose.connect(config.dbURL)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.set('superSecret', config.secret);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use('/', setup);
app.use('/authenticate', authenticate);
app.use('/signup', signup);

app.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other api
        req.decoded = decoded;
        next();
      }
    });

  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

app.use('/expenseEntries', expenseEntries);
app.use('/expenseCategories', expenseCategories);
app.use('/users', users);

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.listen(port);
console.log('Magic happens at http://localhost:' + port);

module.exports = app;
