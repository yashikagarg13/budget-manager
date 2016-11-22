var mongoose = require('mongoose');

var ExpenseCategorySchema = new mongoose.Schema({
  title: String,
  email: String,
});

module.exports = mongoose.model('ExpenseCategory', ExpenseCategorySchema);
