const { mongoose, db } = require("../database");
const Schema = mongoose.Schema;

const AvailableTimes = mongoose.model("AvailableTimes", {
  tableId: [{ type: Schema.Types.ObjectId, ref: "Table" }],
  time: Date
});

module.exports = AvailableTimes;
