const express = require('express');
const router = express.Router();
const R = require('ramda');

const mongoose = require('mongoose');
const ExpenseEntry = require('../models/ExpenseEntry');
const Helpers = require("../helpers");

router.get('/', function(req, res, next) {
  const email = req.decoded.email;
  const filters = req.query.filters ? JSON.parse(req.query.filters) : {};
  filters.email = email;
  const fields = req.query.fields || "";
  const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
  const perPage = req.query.perPage || Infinity;
  const page = req.query.page || 0;

  let total = 0;
  ExpenseEntry
    .find(filters)
    .count(function (err, count) {
      total = count;
    })

  ExpenseEntry
    .find(filters)
    .limit(perPage)
    .skip(page * perPage)
    .populate(fields)
    .sort(sort)
    .exec(function(err, expenseEntries) {
      if (err)
        return next(err);

      res.json({success: true, data: expenseEntries, total});
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
  expense.email = req.decoded.email;
  ExpenseEntry.create(expense, function (err, post) {
    if (err) return next(err);
    res.json({success: true, data: post});
  });
});

router.put('/updateCategory', function(req, res, next) {
  let bulk = ExpenseEntry.collection.initializeOrderedBulkOp();
  bulk
    .find({category: req.body.oldCategoryId, email: req.decoded.email})
    .update({$set: {category: req.body.newCategoryId}});

  bulk.execute(function (err) {
    if (err) return next(err);
    res.json({success: true});
  });
});

router.put('/:id', function(req, res, next) {
  const expense = req.body.expense;
  expense.email = req.decoded.email;
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
