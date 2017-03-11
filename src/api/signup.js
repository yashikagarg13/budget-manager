var express = require('express');
var router = express.Router();
var bCrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");

var config = require("../config");
var User = require('../models/User');

router.post('/', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (user) {
      res.json({ success: false, message: 'User already exists' });
    } else {
      var newUser = new User({
        email: req.body.email,
        password: bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(10), null),
        currency: req.body.currency,
      });

      newUser.save(function(err) {
        if (err) throw err;
        var token = jwt.sign(newUser, config.secret, {
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
});

module.exports = router;
