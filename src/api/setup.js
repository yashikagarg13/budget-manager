var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User');

router.get('/setup', function(req, res) {

  // create a sample user
  var nick = new User({
    email: 'Nick Cerminara',
    password: 'password',
    currency: "USD"
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;
