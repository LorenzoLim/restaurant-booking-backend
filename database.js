require("dotenv").config();
const mongoose = require("mongoose");

// Use the promise functionality built into Node
mongoose.Promise = global.Promise;

const db = mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds339348.mlab.com:39348/restaurant-booking`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Successfully connected to database!");
  })
  .catch(error => {
    // Something went wrong!
    console.log("Error connecting to MongoDB database", error);
  });

module.exports = { mongoose, db };
