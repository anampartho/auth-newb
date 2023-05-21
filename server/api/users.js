const express = require("express");
const router = express.Router();

const db = require("../db/connection");
const users = db.get("users");

router.get("/", async (req, res, next) => {
  try {
    const data = await users.find({}, "username");
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
