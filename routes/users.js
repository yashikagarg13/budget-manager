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

router.delete('/:id', function(req, res) {
  User.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
