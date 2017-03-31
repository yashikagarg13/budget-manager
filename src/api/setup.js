const R = require("ramda");
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const ExpenseCategory = require('../models/ExpenseCategory');

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
  const email = req.decoded.email;
  ExpenseCategory.find({email: email}, function (err, categories) {
    if(err) {
      throw err;
    }

    if(categories.length == 0) {
      const data = R.map(title => {
        return {email, title};
      }, defaultExpenseCategories);

      ExpenseCategory.collection.insert(data, {}, function (err, posts) {
        if (err)  return next(err);
        res.json({
          success: true,
          message: "Setup successful",
        });
      });
    } else {
      res.json({
        success: true,
        message: "Setup already completed!",
      });
    }
  });
});

module.exports = router;