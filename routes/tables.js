const express = require("express");
const Table = require("../models/Table");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

/* Returns all tables or all tables by user id */
router.get("/", (req, res) => {
  Table.find().then(table => {
    res.json(table);
  });
});

/* Find table by ID */
router.get("/:id", (req, res) => {
  Table.findById(req.params.id).then(table => {
    res.send(table);
  });
});

/* Creates new table */
router.post("/", (req, res) => {
  Table.create({
    size: req.body.size,
    minSize: req.body.minSize
  }).then(table => {
    res.send(table);
  });
});

/* Update data from database */
router.put("/:id", (req, res) => {
  Table.findOneAndUpdate(req.params.id, req.body).then(table => {
    res.send(table);
  });
});

/* Delete data from database */
router.delete("/:id", (req, res) => {
  Table.findByIdAndRemove(req.params.id).then(table => {
    res.send(`${table} deleted`);
  });
});

module.exports = router;
