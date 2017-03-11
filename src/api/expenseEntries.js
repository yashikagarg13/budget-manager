var express = require('express');
var router = express.Router();
var R = require('ramda');

var mongoose = require('mongoose');
var ExpenseEntry = require('../models/ExpenseEntry');

router.get('/', function(req, res, next) {
  var email = req.decoded._doc.email;
  var queryFromReq = R.dissoc("token", req.query);
  var queryToDB = R.assoc("email", email, queryFromReq);

  ExpenseEntry.find(queryToDB, function(err, expenseEntries) {
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
  expense.email = req.decoded._doc.email
  ExpenseEntry.create(expense, function (err, post) {
    if (err) return next(err);
    res.json({success: true, data: post});
  });
});

router.put('/:id', function(req, res, next) {
  ExpenseEntry.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json({success: true, data: post});
  });
});

router.put('/updateCategory', function(req, res, next) {
  var bulk = ExpenseEntry.collection.initializeOrderedBulkOp();
  bulk
    .find({category: req.query.oldCaetgoryId, email: req.decoded._doc.email})
    .update({$set: {category: req.query.newCaetgoryId}})
    .execute(function (err) {
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
