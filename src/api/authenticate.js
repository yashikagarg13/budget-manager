const express = require("express");
const router = express.Router();
const passport = require("passport");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt-nodejs");

const authConfig = require("../config/auth");
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
      if (!bcrypt.compareSync(req.body.password, user.password)) {
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
});

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));
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
});

router.post("/requestResetPasswordLink", function (req, res) {
  const email = req.body.email;

  User.findOne({email}, function (err, user) {
    if (err) {
      throw err;
    }

    if (!user) {
      res.json({
        success: false,
        message: "User does not exists!!",
      });
    } else {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: authConfig.sendEmail.auth,
      });

      const token = utils.createToken(user, {expiresIn: "1d"});
      const link = `http://${dbConfig.domain}:${dbConfig.port}/settings/${token}?currency=${user.currency}`;

      const message = "<div>" +
        "<p><b>Dear " + email.split("@")[0] +", </b></p><br/>" +
        "<p>This email was sent automatically by KYGClub in response to your request to reset your password. " +
        "This is done for your protection; only you, the recipient of this email can take the next step " +
        "in the password recovery process.</p><br/>" +
        "<p>To reset your password and access your account, click on the following link (expires in 24 hours):</p>" +
        "<a href='" + link + "'>Reset Link</a><br/><br/><br/>" +
        "Thank You,<br/>" +
        authConfig.sendEmail.senderName +
      "</div>";

      const mailOptions = {
        from: `"${authConfig.sendEmail.senderName}" <${authConfig.sendEmail.auth.user}>`,
        to: email,
        subject: "KYGClub Budget Manager: Reset Password",
        html: message,
      };
      console.log(mailOptions);

      transporter.sendMail(mailOptions, function(err, response){
        if(err)
          throw err;

        res.json({success: true, message: "Email sent!", response});
        transporter.close();
      });
    }
  });
});

module.exports = router;
