const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const signUp = (req, res, next) => {
  const emailStr = req.body.email;
  const passwordStr = req.body.password;

  User.find({ email: emailStr })
    .then((user) => {
      if (user.length >= 1) {
        return res.status(209).json({
          message: "Email already exist",
        });
      } else {
        bcrypt.hash(passwordStr, 10, (err, hash) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: emailStr,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(200).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

const login = (req, res, next) => {
  const emailStr = req.body.email;
  const passwordStr = req.body.password;

  User.find({ email: emailStr })
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }
      bcrypt.compare(passwordStr, user[0].password, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Auth Failed" });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              _id: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          res.status(200).json({
            message: "Successfully logged in",
            token: token,
          });
        } else {
          return res.status(401).json({
            message: "Authorization Failed",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = {
  signUp,
  login,
};
