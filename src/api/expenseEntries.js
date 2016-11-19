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

router.get('/:id', function(req, res, next) {
  ExpenseEntry.findById(req.params.id, function(err, expenseEntry) {
    if (err)
      return next(err);

    res.json(expenseEntry);
  });
});

router.post('/', function(req, res, next) {
  ExpenseEntry.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', function(req, res, next) {
  ExpenseEntry.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  ExpenseEntry.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
