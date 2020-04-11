const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTag = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    movie: { type: Schema.Types.ObjectId, ref: "movie" },
    tag: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("usertag", userTag);
