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
exports.add_Model = (req, res) => {
  let item = new model(req.body);
  item
    .save()
    .then(item => {
      res.status(200).json({ data: "model is added successfully", item });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
};
//update
exports.update_Model = (req, res) => {
  model
    .findOne({ movieId: req.params.id }, (err, item) => {
      if (!item) {
        res.json("data not found");
      } else {
        if (req.body.movieId != null) {
          item.movieId = req.body.movieId;
        }
        if (req.body.movieName != null) {
          item.movieName = req.body.movieName;
        }
        if (req.body.country != null) {
          item.country = req.body.country;
        }
        if (req.body.type != null) {
          item.type = req.body.type;
        }
        if (req.body.year != null) {
          item.year = req.body.year;
        }
        if (req.body.isTinhCam != null) {
          item.isTinhCam = req.body.isTinhCam;
        }
        if (req.body.isVienTuong != null) {
          item.isVienTuong = req.body.isVienTuong;
        }
        if (req.body.isHanhDong != null) {
          item.isHanhDong = req.body.isHanhDong;
        }
        if (req.body.isHaiHuoc != null) {
          item.isHaiHuoc = req.body.isHaiHuoc;
        }
        if (req.body.isCoTrang != null) {
          item.isCoTrang = req.body.isCoTrang;
        }
        if (req.body.isHoatHinh != null) {
          item.isHoatHinh = req.body.isHoatHinh;
        }
        if (req.body.isTaiLieu != null) {
          item.isTaiLieu = req.body.isTaiLieu;
        }
        if (req.body.isHinhSu != null) {
          item.isHinhSu = req.body.isHinhSu;
        }
        if (req.body.isKinhDi != null) {
          item.isKinhDi = req.body.isKinhDi;
        }
        item.updatedAt = new Date();
        item.__v += 1;
        item.save().then(itemUpdated => {
          res.status(200).json({ data: "updated successfully", itemUpdated });
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
