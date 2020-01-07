const { mongoose, db } = require("../database");
const Schema = mongoose.Schema;

const Booking = mongoose.model("Booking", {
  dateTime: Date,
  name: String,
  size: Number,
  booked: Boolean,
  bookingUser: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

module.exports = Booking;
