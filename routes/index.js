const express = require("express");
const csv = require("express-csv");
const Booking = require("../models/Booking");
const User = require("../models/User");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Restaurant Booking" });
});

module.exports = router;
