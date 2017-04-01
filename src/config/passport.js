const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;

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
    User.findOne({$or: [{"facebook.id": profile.id}, {email:profile.emails[0].value}]}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        if (!user.facebook.id) {
          user.facebook.id    = profile.id;
          user.facebook.token = token;
          user.facebook.name  = profile.displayName;
          user.facebook.email = profile.emails[0].value;

          user.save(function(err) {
            if (err)
              throw err;

            return done(null, user);
          });
        } else {
          return done(null, user);
        }
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

  // google-login
  passport.use(new GoogleStrategy(authConfig.googleAuth, function (token, refreshToken, profile, done) {
    User.findOne({$or: [{"google.id": profile.id}, {email:profile.emails[0].value}]}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        if (!user.google.id) {
          user.google.id    = profile.id;
          user.google.token = token;
          user.google.name  = profile.displayName;
          user.google.email = profile.emails[0].value;

          user.save(function(err) {
            if (err)
              throw err;

            return done(null, user);
          });
        } else {
          return done(null, user);
        }
      } else {
        let newUser = new User();
        newUser.google.id    = profile.id;
        newUser.google.token = token;
        newUser.google.name  = profile.displayName;
        newUser.google.email = profile.emails[0].value;
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