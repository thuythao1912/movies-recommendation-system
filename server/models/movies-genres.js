const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieGenre = new Schema(
  {
    movie: { type: Schema.Types.ObjectId, ref: "movie" },
    genre: { type: Schema.Types.ObjectId, ref: "genre" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("moviesgenre", movieGenre);
