var movies_model = require("../models/movies");
var moviesgenres_model = require("../models/movies-genres");
//get list
exports.get_Movies_List = (req, res) => {
  let page = req.query.page;
  let limit = Number(req.query.limit);
  if (page != undefined && limit != undefined) {
    let documentStart = (page - 1) * limit;
    movies_model
      .find(
        {},
        null,
        {
          limit: limit,
          skip: documentStart,
          sort: { createdAt: -1 },
        },
        (err, item) => {
          if (err) {
            console.log(err);
            res.status(500).send(`Something went wrong...`);
          } else {
            res.json(item);
          }
        }
      )
      .catch((err) => {
        res.status(400).send(`Unable to get to database...`);
      });
  } else {
    movies_model
      .find({}, null, { sort: { createdAt: -1 } }, (err, item) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Something went wrong...`);
        } else {
          res.json(item);
        }
      })
      .catch((err) => {
        res.status(400).send(`Unable to get to database...`);
      });
  }
};
//get by _id
exports.get_Movie_By_Id = (req, res) => {
  movies_model
    .findById(req.params.id)
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      res.status(400).send(`Unable to get to database...`);
    });
};
//add
exports.add_Movie = (req, res) => {
  let item = new movies_model(req.body);
  item
    .save()
    .then((item) => {
      res.status(200).json({ data: "item is added successfully", item });
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
};
//
exports.get_Movie_By_Fields = (req, res) => {
  movies_model
    .findOne({
      originalTitle: req.body.originalTitle,
      producers: req.body.producers,
      duration: req.body.duration,
    })
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
};
//delete by id
exports.delete_Movie_By_Id = (req, res) => {
  movies_model.findByIdAndDelete(req.params.id, (err, movie) => {
    if (err) {
      res.json(err);
    } else {
      res.json("successfully removed");
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
        item.save().then((itemUpdated) => {
          res.status(200).json({ data: "updated successfully", itemUpdated });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
//get movies by name
exports.get_Movies_By_Title = (req, res) => {
  movies_model
    .find(
      {
        $or: [
          { originalTitle: { $regex: req.body.title, $options: "i" } },
          { vietnameseTitle: { $regex: req.body.title, $options: "i" } },
        ],
      },
      (err, items) => {
        if (err) console.log(err);
        else {
          res.json(items);
        }
      }
    )
    .catch((err) => console.log(err));
};
//get list by field
exports.get_List_By_Field = (req, res) => {
  let field = req.body.field;
  let value = req.body.value;
  switch (field) {
    case "country":
      movies_model
        .find({ country: value }, (err, items) => {
          if (err) console.log(err);
          else {
            res.json(items);
          }
        })
        .catch((err) => console.log(err));
      break;
    case "type":
      movies_model
        .find({ type: value }, (err, items) => {
          if (err) console.log(err);
          else {
            res.json(items);
          }
        })
        .catch((err) => console.log(err));
      break;
    case "genres":
      moviesgenres_model
        .find({ genre: value })
        .populate("movie")
        .exec((err, item) => {
          if (err) {
            console.log(err);
          } else {
            res.json(item);
          }
        });
  }
};

exports.getMovieByType = (req, res) => {
  let type = req.query.type;
  res.json(type);
};

exports.uploadFile = (req, res) => {
  //upload
  const path = require("path");
  const multer = require("multer");

  const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
      cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
  }).single("myImage");

  upload(req, res, function (err) {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file); //Here you get file.
    /*Now do where ever you want to do*/
    if (!err) {
      return res.send(200).end();
    }
  });
};
