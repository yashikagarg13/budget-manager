require('babel-register');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require("cors");
const jwt = require("jsonwebtoken");

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router');
const match = ReactRouter.match;
const RouterContext = ReactRouter.RouterContext;
const _ = require('lodash');
const fs = require('fs');

const app = express();
app.use(cors());


/***************************************************************************************************************
    API
***************************************************************************************************************/
const config = require('./config');
const setup = require('./api/setup');
const authenticate = require('./api/authenticate');
const expenseEntries = require('./api/expenseEntries');
const expenseCategories= require('./api/expenseCategories');
const users = require('./api/users');
const signup = require('./api/signup');

///////////////////////////////////////////////
// DB SETUP
//////////////////////////////////////////////
const port = process.env.PORT || 8080;
mongoose.Promise = global.Promise;
mongoose.connect(config.dbURL)
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

///////////////////////////////////////////////
// SETUP API ROUTES
//////////////////////////////////////////////
app.set('superSecret', config.secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/authenticate', authenticate);
app.use('/api/signup', signup);

app.use('/api', function(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

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

app.use('/api/setup', setup);
app.use('/api/expenseEntries', expenseEntries);
app.use('/api/expenseCategories', expenseCategories);
app.use('/api/users', users);

/***************************************************************************************************************
    UNIVERSAL RENDERING
***************************************************************************************************************/
const baseTemplate = fs.readFileSync('public/index.html');
const template = _.template(baseTemplate);
const Routes = require('./routes');
const routes = Routes.getRoutes();

app.use('/', express.static('public'))

app.use('/', (req, res) => {
  match({routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const body = ReactDOMServer.renderToString(
        React.createElement(RouterContext, renderProps)
      )
      res.status(200).send(template({body}))
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.listen(port);
console.log('Magic happens at http://localhost:' + port);

module.exports = app;
