var movies_model = require("../models/movies");
var moviesgenres_model = require("../models/movies-genres");
//get list
exports.get_Movies_List = (req, res) => {
  movies_model
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
exports.get_Movie_By_Id = (req, res) => {
  movies_model
    .findById(req.params.id)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(400).send(`Unable to get to database...`);
    });
};
//add
exports.add_Movie = (req, res) => {
  let item = new movies_model(req.body);
  item
    .save()
    .then(item => {
      res.status(200).json({ data: "item is added successfully", item });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
};
//
exports.get_Movie_By_Fields = (req, res) => {
  movies_model
    .findOne({
      originalTitle: req.body.originalTitle,
      producers: req.body.producers,
      duration: req.body.duration
    })
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
};
//delete by id
exports.delete_Movie_By_Id = (req, res) => {
  moviesgenres_model.findOne({ movie: req.params.id }, (err, item) => {
    if (err) {
      res.json(err);
    } else {
      if (!item) {
        movies_model.findByIdAndDelete(req.params.id, (err, movie) => {
          if (err) {
            res.json(err);
          } else {
            res.json("successfully removed");
          }
        });
      } else {
        res.json("fk");
      }
    }
  });
};
//update by id
exports.update_Movie_By_Id = (req, res) => {
  movies_model
    .findById(req.params.id, (err, item) => {
      if (!item) {
        res.json("Data not found");
      } else {
        if (req.body.originalTitle != null) {
          item.originalTitle = req.body.originalTitle;
        }
        if (req.body.vietnameseTitle != null) {
          item.vietnameseTitle = req.body.vietnameseTitle;
        }
        if (req.body.overview != null) {
          item.overview = req.body.overview;
        }
        if (req.body.country != null) {
          item.country = req.body.country;
        }
        if (req.body.year != null) {
          item.year = req.body.year;
        }
        if (req.body.openingDay != null) {
          item.openingDay = req.body.openingDay;
        }
        if (req.body.duration != null) {
          item.duration = req.body.duration;
        }
        if (req.body.producers != null) {
          item.producers = req.body.producers;
        }
        if (req.body.type != null) {
          item.type = req.body.type;
        }
        if (req.body.trailer != null) {
          item.trailer = req.body.trailer;
        }
        if (req.body.poster != null) {
          item.poster = req.body.poster;
        }
        item.updatedAt = new Date();
        item.__v += 1;
        item.save().then(itemUpdated => {
          res.status(200).json({ data: "updated successfully", itemUpdated });
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
