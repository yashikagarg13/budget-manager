var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var ExpenseEntrySchema = new mongoose.Schema({
  id: ObjectId,
  date: {type: Date, default: Date.now},
  category: ObjectId,
  amount: Number,
  description: String,
  currency: String,
  userId: ObjectId,
});

module.exports = mongoose.model('ExpenseEntry', ExpenseEntrySchema);