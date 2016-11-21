var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var ExpenseEntrySchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  category: ObjectId,
  amount: Number,
  description: String,
  currency: String,
  email: String,
});

module.exports = mongoose.model('ExpenseEntry', ExpenseEntrySchema);
