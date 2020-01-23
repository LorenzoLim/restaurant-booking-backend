const express = require("express");
const AvailableTime = require("../models/AvailableTime");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

/* Returns all availableTimes or all availableTimes by user id */
router.get("/", (req, res) => {
  AvailableTime.find().then(availableTime => {
    res.json(availableTime);
  });
});

/* Find availableTime by ID */
router.get("/:id", (req, res) => {
  AvailableTime.findById(req.params.id).then(availableTime => {
    res.send(availableTime);
  });
});

/* Creates new availableTime */
router.post("/", (req, res) => {
  AvailableTime.create({
    tableId: req.body.tableId,
    time: req.body.time
  }).then(availableTime => {
    res.send(availableTime);
  });
});

/* Update data from database */
router.put("/:id", (req, res) => {
  AvailableTime.findOneAndUpdate(req.params.id, req.body).then(
    availableTime => {
      res.send(availableTime);
    }
  );
});

/* Delete data from database */
router.delete("/:id", (req, res) => {
  AvailableTime.findByIdAndRemove(req.params.id).then(availableTime => {
    res.send(`${availableTime} deleted`);
  });
});

module.exports = router;
