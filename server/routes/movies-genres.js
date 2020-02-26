const express = require("express");
const router = express.Router();
const moviesGenres_controller = require("../controllers/movies-genres");

//get list
router.get("/", moviesGenres_controller.get_MoviesGenres_List);
router.get("/movie/:id", moviesGenres_controller.get_Genres_By_MovieId);
router.post("/", moviesGenres_controller.add_MovieGenre);
module.exports = router;
