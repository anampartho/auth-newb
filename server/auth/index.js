const express = require("express");
const Joi = require("joi");
const router = express.Router();

// Databse
const db = require("../db/connection");
const users = db.get("users");

// Set the inde to username
users.createIndex("username", { unique: true });

const schema = Joi.object({
  username: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9_]+$"))
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
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
        res.json({ user });
      });
  }
});

module.exports = router;
