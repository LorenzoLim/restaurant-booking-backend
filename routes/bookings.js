const express = require("express");
const Booking = require("../models/Booking");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

/* Returns all bookings or all bookings by user id */
router.get("/", (req, res) => {
  if (req.query.userId) {
    Booking.aggregate([
      { $match: { bookingUser: new ObjectId(req.query.userId) } }
    ]).then(booking => {
      res.json(booking);
    });
  } else {
    Booking.find().then(booking => {
      res.json(booking);
    });
  }
});

/* Find booking by ID */
router.get("/:id", (req, res) => {
  Booking.findById(req.params.id).then(booking => {
    res.send(booking);
  });
});

/* Creates new booking */
router.post("/", (req, res) => {
  Booking.create({
    dateTime: req.body.dateTime,
    name: req.body.name,
    size: req.body.size,
    booked: req.body.booked
  }).then(booking => {
    res.send(booking);
  });
});

/* Returns all bookings by date */
router.get("/by-date", (req, res) => {
  if (req.query.userId) {
    Booking.aggregate([
      { $match: { bookingUser: new ObjectId(req.query.userId) } }
    ]).then(booking => {
      res.json(booking);
    });
  } else {
    Booking.find().then(booking => {
      res.json(booking);
    });
  }
});

/* Update data from database */
router.put("/:id", (req, res) => {
  Booking.findOneAndUpdate(req.params.id, req.body).then(booking => {
    res.send(booking);
  });
});

/* Delete data from database */
router.delete("/:id", (req, res) => {
  Booking.findByIdAndRemove(req.params.id).then(booking => {
    res.send(`${booking} deleted`);
  });
});

module.exports = router;
