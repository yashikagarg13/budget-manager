var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var cors = require("cors");

var jwt = require("jsonwebtoken");
var config = require('./config');

var setup = require('./routes/setup');
var authenticate = require('./routes/authenticate');
var expenseEntries = require('./routes/expenseEntries');
var expenseCategories= require('./routes/expenseCategories');
var users = require('./routes/users');
var signup = require('./routes/signup');

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
app.use('/expenseEntries', expenseEntries);
app.use('/expenseCategories', expenseCategories);
app.use('/signup', signup);
app.use('/users', users);

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.listen(port);
console.log('Magic happens at http://localhost:' + port);

module.exports = app;
/*var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var cors = require("cors");

var dbConfig = require('./db');
var routes = require('./routes/index');
var expenseEntries = require('./routes/expenseEntries');
var expenseCategories= require('./routes/expenseCategories');

var app = express();

app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Configuring Passport
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());


// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect(dbConfig.url)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

module.exports = app;
*/
