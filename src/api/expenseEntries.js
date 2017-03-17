var express = require('express');
var router = express.Router();
var R = require('ramda');

var mongoose = require('mongoose');
var ExpenseEntry = require('../models/ExpenseEntry');
var Helpers = require("../helpers");

router.get('/', function(req, res, next) {
  var email = req.decoded._doc.email;
  var filters = req.query.filters ? JSON.parse(req.query.filters) : {};
  filters.email = email;

  var fields = req.query.fields || "";
  var sort = req.query.sort ? JSON.parse(req.query.sort) : {};

  console.log(fields, filters);
  ExpenseEntry
    .find(filters)
    .populate(fields)
    .sort(sort)
    .exec(function(err, expenseEntries) {
      if (err)
        return next(err);

      res.json({success: true, data: expenseEntries});
    });
});

router.get('/:id', function(req, res, next) {
  ExpenseEntry.findById(req.params.id, function(err, expenseEntry) {
    if (err)
      return next(err);

    res.json({success: true, data: expenseEntry});
  });
});

router.post('/', function(req, res, next) {
  const expense = req.body.expense;
  expense.email = req.decoded._doc.email;
  ExpenseEntry.create(expense, function (err, post) {
    if (err) return next(err);
    res.json({success: true, data: post});
  });
});

router.put('/updateCategory', function(req, res, next) {
  var bulk = ExpenseEntry.collection.initializeOrderedBulkOp();
  bulk
    .find({category: req.body.oldCategoryId, email: req.decoded._doc.email})
    .update({$set: {category: req.body.newCategoryId}});

  bulk.execute(function (err) {
    if (err) return next(err);
    res.json({success: true});
  });
});

router.put('/:id', function(req, res, next) {
  const expense = req.body.expense;
  expense.email = req.decoded._doc.email;
  ExpenseEntry.findByIdAndUpdate(req.params.id, expense, function (err, post) {
    if (err) return next(err);
    res.json({success: true, data: post});
  });
});

router.delete('/byCategory', function(req, res, next) {
  ExpenseEntry.remove({category: req.query.oldCategoryId}, function (err) {
    if (err) return next(err);
    res.json({success: true});
  });
});


router.delete('/:id', function(req, res, next) {
  ExpenseEntry.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json({success: true, data: post});
  });
});

module.exports = router;
