var R = require("ramda");
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var ExpenseCategory = require('../models/ExpenseCategory');

const defaultExpenseCategories = [
  "Vegetables",
  "Fruits",
  "Milk",
  "Grocery",
  "Clothes",
  "Travel",
  "Entertainement",
  "Newspapers",
  "Cosmetics",
  "Dining outs",
  "Online shopping",
  "Mobile recharge",
  "Electricity bill pay",
  "Phone bill pay",
  "Internet bill pay",
  "Car service",
];

router.get('/', function(req, res, next) {
  var email = req.decoded._doc.email;
  var data = R.map(title => {
    return {email, title};
  }, defaultExpenseCategories);

  ExpenseCategory.collection.insert(data, {}, function (err, posts) {
    if (err)  return next(err);
    console.log("Added category: ", posts);
    res.json({
      success: true,
      message: "Setup successfull",
    });
  });
});

module.exports = router;