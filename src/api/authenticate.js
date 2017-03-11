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

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      // check if password matches
      if (!bCrypt.compareSync(req.body.password, user.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, config.secret, {
          expiresIn: "1h" // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          currency: user.currency,
        });
      }
    }
  });
});

module.exports = router;
