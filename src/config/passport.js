var JwtStrategy = require("passport-jwt").Strategy;

var User = require("../models/User");
var config = require("../config/db");

module.exports = function(passport) {
  var opts = {
    secretOrKey: config.secret,
  };
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({email: jwt_payload.email}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};