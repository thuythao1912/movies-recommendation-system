var userstags_model = require("../models/users-tags");
//add
exports.add_UsersTags = (req, res) => {
  let item = new userstags_model(req.body);
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
exports.get_UsersTags_List = (req, res) => {
  userstags_model
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
