var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var ExpenseEntrySchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  category: {type: ObjectId, ref: "ExpenseCategory"},
  amount: Number,
  description: String,
  currency: String,
  email: {type: String, ref: "User"},
});

module.exports = mongoose.model('ExpenseEntry', ExpenseEntrySchema);
