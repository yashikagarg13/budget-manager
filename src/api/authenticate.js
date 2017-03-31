const express = require("express");
const router = express.Router();
const passport = require("passport");

const dbConfig = require("../config/db");
const User = require("../models/User");
const utils = require("../helpers/utils").default;

router.post("/", function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: "Authentication failed. User not found." });
    } else if (user) {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err || !isMatch) {
          res.json({ success: false, message: "Authentication failed. Wrong password." });
        } else {
          // if user is found and password is right
          // create a token
          const token = utils.createToken(user);

          // return the information including token as JSON
          res.json({
            success: true,
            message: "Enjoy your token!",
            token: token,
            currency: user.currency,
          });
        }
      });
    }
  });
});

router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback", function (req, res) {
  passport.authenticate("facebook", {
    failureRedirect: "/login",
  }, function (err, user) {
    if (err)
      throw err;

    // create a token
    const token = utils.createToken(user);

    res.redirect("/social/success/" + token);
  })(req, res);
})

router.get("/google", passport.authenticate("google", {scope: ['profile', 'email']}));
router.get("/google/callback", function (req, res) {
  passport.authenticate("google", {
    failureRedirect: "/login",
  }, function (err, user) {
    if (err)
      throw err;

    // create a token
    const token = utils.createToken(user);

    res.redirect("/social/success/" + token);
  })(req, res);
})

module.exports = router;
