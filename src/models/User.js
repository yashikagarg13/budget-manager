var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  currency: String,
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  google  : {
    id: String,
    token: String,
    email: String,
    name: String,
  }
});

module.exports = mongoose.model('User', UserSchema);
