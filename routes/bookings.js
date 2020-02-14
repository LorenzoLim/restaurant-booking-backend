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
    status: req.body.status
  }).then(booking => {
    res.send(booking);
  });
});

/* Returns all bookings by date */
router.post("/byDate", (req, res) => {
  Booking.find().then(bookings => {
    const filteredDates = bookings
      .map(booking => {
        const dateString = booking.dateTime.toLocaleDateString();
        const requestDateString = new Date(
          req.body.dateTime
        ).toLocaleDateString();

        console.log(dateString);
        console.log(requestDateString);

        if (requestDateString === dateString) {
          console.log("Booking matched: ", booking);

          return booking;
        } else {
          return;
        }
      })
      .filter(date => date);
    console.log("Filtered dates: ", filteredDates);

    res.json(filteredDates);
  });
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
