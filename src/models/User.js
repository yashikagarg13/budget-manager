var mongoose = require('mongoose');
var bcrypt = require("bcrypt");

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

UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
