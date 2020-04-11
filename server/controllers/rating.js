var rating_model = require("../models/rating");
//add
exports.add_Rating = (req, res) => {
  let item = new rating_model(req.body);
  item
    .save()
    .then(item => {
      res.status(200).json({ data: "item is added successfully", item });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
};
//get list
exports.get_Rating_List = (req, res) => {
  let movie = req.query.movie;
  let user = req.query.user;
  if (movie != undefined) {
    rating_model
      .find({ movie: movie }, (err, items) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Something went wrong...`);
        } else {
          res.json(items);
        }
      })
      .catch(err => {
        res.status(400).send(`Unable to get to database...`);
      });
  } else if (user != undefined) {
    rating_model
      .find({ user: user }, (err, items) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Something went wrong...`);
        } else {
          res.json(items);
        }
      })
      .catch(err => {
        res.status(400).send(`Unable to get to database...`);
      });
  } else {
    rating_model
      .find((err, items) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Something went wrong...`);
        } else {
          res.json(items);
        }
      })
      .catch(err => {
        res.status(400).send(`Unable to get to database...`);
      });
  }
};

//get list by movie id
exports.get_List_By_Movie = (req, res) => {
  rating_model.find({ movie: req.params.movie }, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send(`Something went wrong...`);
    } else {
      let sum = 0;
      items.forEach(item => {
        sum += item.rating;
      });
      res.json((sum / items.length).toFixed(1));
    }
  });
};

//delete rating by movie id
exports.delete_List_By_Movie = (req, res) => {
  let movie = req.query.movie;
  let user = req.query.user;
  if (movie != undefined) {
    rating_model
      .deleteMany({ movie: movie }, (err, item) => {
        if (err) {
          res.json("Data not found");
        } else {
          res.json("successfully deleted");
        }
      })
      .catch(err => console.log(err));
  }
  if (user != undefined) {
    rating_model
      .deleteMany({ user: user }, (err, item) => {
        if (err) {
          res.json("Data not found");
        } else {
          res.json("successfully deleted");
        }
      })
      .catch(err => console.log(err));
  }
};
