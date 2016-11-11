var mongoose = require('mongoose');

var ExpenseCategorySchema = new mongoose.Schema({
  title: String,
});

module.exports = mongoose.model('ExpenseCategory', ExpenseCategorySchema);
