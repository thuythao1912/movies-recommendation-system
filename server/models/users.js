const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    name: { type: String },
    gender: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", user);
