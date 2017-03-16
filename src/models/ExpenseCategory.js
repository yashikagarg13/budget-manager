var mongoose = require('mongoose');

var ExpenseCategorySchema = new mongoose.Schema({
  title: String,
  email: {type: String, ref: "User"},
});

module.exports = mongoose.model('ExpenseCategory', ExpenseCategorySchema);
