let movies = require("../models/movies");
let genres = require("../models/genres");
let users = require("../models/users");
exports.getTotalPage = (req, res) => {
  let collection = req.query.collection;
  let limit = req.query.limit;
  switch (collection) {
    case "movies":
      movies.find({}, null, { sort: { createdAt: -1 } }, (err, item) => {
        res.json(Math.ceil(item.length / limit));
      });
      break;
    case "genres":
      genres.find({}, null, { sort: { createdAt: -1 } }, (err, item) => {
        res.json(Math.ceil(item.length / limit));
      });
      break;
    case "users":
      users.find({}, null, { sort: { createdAt: -1 } }, (err, item) => {
        res.json(Math.ceil(item.length / limit));
      });
      break;
  }
};
