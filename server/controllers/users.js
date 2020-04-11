const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync();
var users_model = require("../models/users");

//get list
exports.get_Users_List = (req, res) => {
  let page = req.query.page;
  let limit = Number(req.query.limit);
  if (page != undefined && limit != undefined) {
    let documentStart = (page - 1) * limit;
    users_model
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
    users_model
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

//login
exports.checkLogin = (req, res) => {
  users_model
    .findOne({ username: req.body.username }, (err, item) => {
      if (err) {
        console.log(err);
        res.status(500).send(`Something went wrong...`);
      } else if (item) {
        console.log(item);
        let isCorrectPasssword = bcrypt.compareSync(
          req.body.password,
          item.password
        );
        if (isCorrectPasssword) {
          res.json({ user: item, jwt: `${item._id}` });
        }
      } else {
        res.json({ user: null, jwt: null });
      }
    })
    .catch((err) => {
      res.status(400).send(`Unable to get to database...`);
    });
};

//add
exports.add_User = (req, res) => {
  let item = new users_model(req.body);
  users_model
    .findOne({ username: item.username }, (err, result) => {
      if (!result) {
        item.password = bcrypt.hashSync(item.password, salt);
        item
          .save()
          .then((item) => {
            res.status(200).json({ data: "item is added successfully", item });
          })
          .catch((err) => {
            res.status(400).send("unable to save to database");
          });
      } else if (result) {
        res.json({
          message: "Tên đăng nhập đã có, vui lòng chọn tên đăng nhập khác!",
        });
      } else if (err) {
        console.log(err);
      }
    })
    .catch((err) => console.log(err));
};

//get user by id
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
    .catch((err) => {
      res.status(400).send(`Unable to get to database...`);
    });
};
//delete by id
exports.delete_User_By_Id = (req, res) => {
  users_model.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      res.json(err);
    } else {
      res.json("successfully removed");
    }
  });
};
