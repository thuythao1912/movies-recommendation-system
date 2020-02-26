const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movie = new Schema(
  {
    originalTitle: { type: String },
    vietnameseTitle: { type: String },
    overview: { type: String },
    country: { type: String },
    year: { type: String },
    openingDay: { type: Date },
    duration: { type: String },
    producers: { type: String },
    type: { type: String },
    trailer: { type: String },
    poster: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("movie", movie);
