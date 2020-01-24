const { mongoose, db } = require("../database");
const Schema = mongoose.Schema;

const Table = mongoose.model("Table", {
  size: Number,
  minSize: Number
});

module.exports = Table;
