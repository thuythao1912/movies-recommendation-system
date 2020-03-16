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
  rating_model
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
