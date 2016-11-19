var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  currency: String,
});

module.exports = mongoose.model('User', UserSchema);
