const express = require("express");
const router = express.Router();

const dbConfig = require("../config/db");
const User = require("../models/User");
const utils = require("../helpers/utils").default;

router.post("/", function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, message: "Please enter email and password!"});
  } else {
    User.findOne({
      $or: [{
        email: req.body.email
      },{
        "facebook.email": req.body.email,
      }, {
        "google.email": req.body.email,
      }]
    }, function(err, user) {
      if (err) throw err;

      if (user) {
        const token = utils.createToken(user);
        res.json({
          success: true,
          message: "User already exists",
          token: token,
          currency: user.currency,
        });

      } else {
        const newUser = new User({
          email: req.body.email,
          password: utils.generatePassword(req.body.password),
          currency: req.body.currency,
        });

        newUser.save(function(err) {
          if (err)
            throw err;

          const token = utils.createToken(newUser);
          res.json({
            success: true,
            message: "User successfully saved",
            token: token,
            currency: newUser.currency,
          });
        });
      }
    });
  }
});

module.exports = router;
