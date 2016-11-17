var express = require('express');
var router = express.Router();

var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res) {
  User.find(function(err, users) {
    if (err)
      return next(err);

    res.json(users);
  });
});

module.exports = router;
