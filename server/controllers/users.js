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

//login
exports.checkLogin = (req, res) => {
  users_model
    .findOne(
      { username: req.body.username, password: req.body.password },
      (err, item) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Something went wrong...`);
        } else if (item) {
          res.json({ user: item, jwt: `${item._id}` });
        } else {
          res.json({ user: null, jwt: null });
        }
      }
    )
    .catch(err => {
      res.status(400).send(`Unable to get to database...`);
    });
};

//add
exports.add_User = (req, res) => {
  let item = new users_model(req.body);
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
exports.get_User = (req, res) => {
  users_model
    .findById(req.params.id, (err, item) => {
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
