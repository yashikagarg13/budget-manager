const express = require("express");
const router = express.Router();

const User = require("../models/User");
const utils = require("../helpers/utils").default;

/* GET users listing. */
router.get("/", function(req, res) {
  User.find(function(err, users) {
    if (err)
      return next(err);

    res.json(users);
  });
});

router.delete("/:id", function(req, res) {
  User.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put("/updateCurrency", function (req, res) {
  const email = req.decoded.email;
  User.findOneAndUpdate({email: email}, {currency: req.body.currency}, function (err, user) {
    if (err) {
      throw err;
    }
    res.json({success: true, data: user});
  });
});

router.put("/updatePassword", function (req, res) {
  const email = req.decoded.email;
  const password = utils.generatePassword(req.body.password);
  User.findOneAndUpdate({email: email}, {password: password}, function (err, user) {
    if (err) {
      throw err;
    }
    res.json({success: true});
  });
});

router.put("/takeFile", function (req, res) {
  console.log('request', req);
});

module.exports = router;
