var mongoose = require('mongoose');

var ExpenseCategorySchema = new mongoose.Schema({
  id: ObjectId,
  title: String,
});

module.exports = mongoose.model('ExpenseCategory', ExpenseCategorySchema);
