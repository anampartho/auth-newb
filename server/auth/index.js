const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Databse
const db = require("../db/connection");
const users = db.get("users");

// Set the inde to username
users.createIndex("username", { unique: true });

const schema = Joi.object({
  username: Joi.string()
    .trim()
    .pattern(new RegExp("^[a-zA-Z0-9_]+$"))
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().trim().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

router.get("/", (req, res) => {
  res.json({
    message: "🔐 Locked!",
  });
});

router.post("/signup", (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    // res.json(value);
    users
      .findOne({
        username: value.username,
      })
      .then((user) => {
        if (user) {
          // there is a user in the db - send an error
          const error = new Error(
            "Username already taken. Please choose a unique username."
          );
          next(error);
        } else {
          // hash the password
          bcrypt.hash(value.password, 12).then((hashedPassword) => {
            const newUser = {
              username: value.username,
              password: hashedPassword,
            };

            users.insert(newUser).then((insertedUser) => {
              // TODO: Check if there is a way to do this using the mongodb insert
              delete insertedUser.password;
              res.json(insertedUser);
            });
          });
          // insert the user to the db
        }
      });
  }
});

module.exports = router;
