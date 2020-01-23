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
    minSize: req.body.minSize,
    date: req.body.date
  }).then(table => {
    res.send(table);
  });
});

/* Returns all tables by date */
router.post("/byDate", (req, res) => {
  Table.find().then(tables => {
    const filteredDates = tables
      .map(table => {
        const dateString = table.date.toLocaleDateString();
        const requestDateString = new Date(req.body.date).toLocaleDateString();

        if (requestDateString === dateString) {
          return table;
        } else {
          return;
        }
      })
      .filter(date => date);

    res.json(filteredDates);
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
