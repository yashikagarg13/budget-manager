var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var ExpenseCategory = require('../models/ExpenseCategory');

router.get('/', function(req, res, next) {
  ExpenseCategory
    .find({email: req.decoded.email})
    .sort('title')
    .exec(function(err, expenseCategories) {
    if (err)
      return next(err);

    res.json({success: true, data: expenseCategories});
  });
});

router.post('/', function(req, res, next) {
  let payload = {
    email: req.decoded.email,
    title: req.body.title,
  };
  ExpenseCategory.create(payload, function (err, post) {
    if (err) return next(err);
    res.json({success: true, data: post});
  });
});

router.put('/:id', function(req, res, next) {
  let payload = {
    title: req.body.title,
  };
  ExpenseCategory.findByIdAndUpdate(req.params.id, payload, function (err, post) {
    if (err) return next(err);
    res.json({success: true, data: post});
  });
});

router.delete('/:id', function(req, res, next) {
  ExpenseCategory.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json({success: true, data: post});
  });
});

module.exports = router;
