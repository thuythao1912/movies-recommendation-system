var genres_model = require("../models/genres");
var train_controller = require("../train/controllers");
//get list
exports.get_Genres_List = (req, res) => {
  genres_model
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
exports.get_Genre_By_Id = (req, res) => {
  genres_model
    .findById(req.params.id)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(400).send(`Unable to get to database...`);
    });
};
//add
exports.add_Genre = (req, res) => {
  let item = new genres_model(req.body);
  item
    .save()
    .then(item => {
      res.status(200).json({ data: "item is added successfully", item });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  // train_controller.add_Model("5e568da9d3bd1b33e8833ba6", req.body.name);
};
