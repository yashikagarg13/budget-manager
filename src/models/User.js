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
  }
});

UserSchema.pre("save", function(next) {
  var user = this; console.log('this', this);
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) {
          return next(err);
        }
        user.password = hash;
        next();
      })
    });
  } else {
    return next();
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
