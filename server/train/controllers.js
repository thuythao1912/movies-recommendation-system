var model = require("./models");

//get list
exports.get_Models_List = (req, res) => {
  model
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
exports.get_Model_By_Id = (req, res) => {
  model
    .findById(req.params.id)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(400).send(`Unable to get to database...`);
    });
};
//add
exports.add_Model = (
  movieId,
  movieName,
  country,
  type,
  year,
  isTinhCam,
  isVienTuong,
  isHanhDong,
  isHaiHuoc,
  isCoTrang,
  isHoatHinh,
  isTaiLieu,
  isHinhSu,
  isKinhDi
) => {
  let item = new model({
    movieId,
    movieName,
    country,
    type,
    year,
    isTinhCam,
    isVienTuong,
    isHanhDong,
    isHaiHuoc,
    isCoTrang,
    isHoatHinh,
    isTaiLieu,
    isHinhSu,
    isKinhDi
  });
  item.save();
  console.log("add model to train successfully");
};
