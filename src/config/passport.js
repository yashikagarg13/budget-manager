const FacebookStrategy = require("passport-facebook").Strategy;

const User = require("../models/User");
const dbConfig = require("../config/db");
const authConfig = require("../config/auth");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });

  // used to deserialize the user
  passport.deserializeUser(function(email, done) {
    User.find({email: email}, function(err, user) {
      done(err, user);
    });
  });


  // facebook-login
  passport.use(new FacebookStrategy(authConfig.facebookAuth, function (token, refreshToken, profile, done) {
    User.findOne({"facebook.id": profile.id}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        let newUser = new User();
        newUser.facebook.id    = profile.id;
        newUser.facebook.token = token;
        newUser.facebook.name  = profile.displayName;
        newUser.facebook.email = profile.emails[0].value;
        newUser.email = profile.emails[0].value;
        newUser.currency = "INR";

        newUser.save(function(err) {
          if (err)
            throw err;

          return done(null, newUser);
        });
      }
    });
  }));
};