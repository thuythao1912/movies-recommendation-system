var moviesGenres_model = require("../models/movies-genres");

//get list
exports.get_MoviesGenres_List = (req, res) => {
  moviesGenres_model
    .find((err, item) => {
      if (err) {
        console.log(err);
        res.status(500).send(`Something went wrong...`);
      } else {
        res.json(item);
      }
    })
    .catch(err => {
      res.status(400).send(`Unable to get to database...`);
    });
};
//get by _id
exports.get_MoviesGenres_By_Id = (req, res) => {
  moviesGenres_model
    .findById(req.params.id)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(400).send(`Unable to get to database...`);
    });
};
//add
exports.add_MovieGenre = (req, res) => {
  let item = new moviesGenres_model(req.body);
  item
    .save()
    .then(item => {
      res.status(200).json({ data: "item is added successfully", item });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
};
//get genres by movie id
exports.get_Genres_By_MovieId = (req, res) => {
  moviesGenres_model
    .find({ movie: req.params.id })
    .populate("genre")
    .exec((err, item) => {
      if (err) {
        console.log(err);
      } else {
        res.json(item);
      }
    });
};
