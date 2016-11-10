var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var ExpenseEntry = require('../models/ExpenseEntry');

router.get('/', function(req, res, next) {
  ExpenseEntry.find(function(err, expenseEntries) {
    if (err)
      return next(err);

    res.json(expenseEntries);
  });
});

router.post('/', function(req, res, next) {
  Todo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;