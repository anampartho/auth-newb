const express = require("express");
const Joi = require("joi");
const router = express.Router();

// Databse
const db = require("../db/connection");
const notes = db.get("notes");

const schema = Joi.object({
  title: Joi.string().trim().max(100).required(),
  description: Joi.string().trim().required(),
});

router.get("/", (req, res) => {
  res.json([]);
});

router.post("/", (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(422);
    next(error);
  } else {
    const newNote = {
      ...req.body,
      created_by: req.user.id,
    };

    notes.insert(newNote).then((insertedNote) => {
      res.json(insertedNote);
    });
  }
});

module.exports = router;
