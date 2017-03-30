var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var dbConfig = require("../config/db");
var User = require('../models/User');

router.post('/', function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, message: 'Please enter email and password!'});
  } else {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;

      if (user) {
        res.json({ success: false, message: 'User already exists' });
      } else {
        var newUser = new User({
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null),
          currency: req.body.currency,
        });

        newUser.save(function(err) {
          if (err) throw err;
          var token = jwt.sign(newUser, dbConfig.secret, {
            expiresIn: "1h" // expires in 24 hours
          });
          res.json({
            success: true,
            message: 'User successfully saved',
            token: token,
            currency: newUser.currency,
          });
        });
      }
    });
  }
});

module.exports = router;
