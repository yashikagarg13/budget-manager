var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  id: ObjectId,
  email: String,
  password: String,
  currency: String,
});

module.exports = mongoose.model('User', UserSchema);