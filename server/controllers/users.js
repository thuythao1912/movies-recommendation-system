var users_model = require("../models/users");

//get list
exports.get_Users_List = (req, res) => {
  users_model
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
