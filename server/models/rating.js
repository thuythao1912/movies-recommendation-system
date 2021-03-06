const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rating = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    movie: { type: Schema.Types.ObjectId, ref: "movie" },
    rating: { type: Number },
    comment: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("rating", rating);
