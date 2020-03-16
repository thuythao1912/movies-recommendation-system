const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    username: { type: String },
    password: { type: String },
    email: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", user);
