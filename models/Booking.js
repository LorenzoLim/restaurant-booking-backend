const { mongoose, db } = require("../database");
const Schema = mongoose.Schema;

const Booking = mongoose.model("Booking", {
  date: Date,
  time: Date,
  name: String,
  size: Number,
  bookingUser: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

module.exports = Booking;
