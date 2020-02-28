var countries_model = require("../models/countries");

//get list
exports.get_Countries_List = (req, res) => {
  countries_model
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
exports.get_Country_By_Id = (req, res) => {
  countries_model
    .findById(req.params.id)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(400).send(`Unable to get to database...`);
    });
};
//add
exports.add_Country = (req, res) => {
  let item = new countries_model(req.body);
  item
    .save()
    .then(item => {
      res.status(200).json({ data: "item is added successfully", item });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
};
