var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var ExpenseCategory = require('../models/ExpenseCategory');

router.get('/', function(req, res, next) {
  ExpenseCategory.find(function(err, expenseCategories) {
    if (err)
      return next(err);

    res.json(expenseCategories);
  });
});

router.post('/', function(req, res, next) {
  ExpenseCategory.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', function(req, res, next) {
  ExpenseCategory.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  ExpenseCategory.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
