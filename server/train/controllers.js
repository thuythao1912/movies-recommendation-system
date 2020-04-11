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

// //recommend movie
// exports.moviesRecommended = (req, res) => {
//   model
//     .find((err, items) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send(`Something went wrong...`);
//       } else {
//         let data = items; // list of movies in db
//         let movie = req.body.id; //input movie
//         let movieIndex = 0;
//         //find input movie index
//         for (let i = 0; i < data.length; i++) {
//           if (data[i].movieId == movie) {
//             movieIndex = i;
//             break;
//           }
//         }
//         let matrix = []; // matrix storing result
//         let featuresList = Object.keys(data[0].toObject());
//         for (let i = 0; i < data.length; i++) {
//           if (data[movieIndex].movieId == data[i].movieId) continue;
//           var similarities = 0; // số lượng features giống nhau
//           var movieIndexFeatures = 0;
//           var movieIFeatures = 0;
//           for (let j = 1; j < featuresList.length - 7; j++) {
//             //so sánh từng features của data[movieIndex] với data[i]
//             if (data[movieIndex][featuresList[j]] !== false)
//               movieIndexFeatures++;
//             if (data[i][featuresList[j]] !== false) movieIFeatures++;
//             if (
//               data[movieIndex][featuresList[j]] == data[i][featuresList[j]] &&
//               (data[movieIndex][featuresList[j]] != false ||
//                 data[i][featuresList[j]] != false)
//             ) {
//               similarities++;
//             }
//           }

//           console.log(movieIndexFeatures, movieIFeatures, similarities);

//           matrix.push(
//             similarities / (movieIndexFeatures + movieIFeatures - similarities)
//           ); //tương quan giống nhau giữa data[movieIndex] và data[i]
//         }
//         //kq matrix
//         console.log(matrix);

//         //sort
//         var valueArray = [];
//         var indexArr = [];

//         //copy matrix to valueArray
//         valueArray = [...matrix];

//         // push index/name/id/... into array
//         for (let i = 0; i < data.length; i++) {
//           if (data[movieIndex].movieId == data[i].movieId) continue;
//           indexArr.push(data[i].movieId);
//         }

//         //sort valueArray
//         for (let i = 0; i < valueArray.length; i++) {
//           for (let j = i + 1; j < valueArray.length; j++) {
//             if (valueArray[j] > valueArray[i]) {
//               //swap value
//               let tempValue = valueArray[j];
//               valueArray[j] = valueArray[i];
//               valueArray[i] = tempValue;

//               //swap index
//               let tempIndex = indexArr[j];
//               indexArr[j] = indexArr[i];
//               indexArr[i] = tempIndex;
//             }
//           }
//         }
//         console.log(valueArray);
//         // console.log(indexArr);
//         if (indexArr.length >= 5) {
//           res.json(indexArr.slice(0, 5));
//         } else {
//           res.json(indexArr);
//         }
//       }
//     })
//     .catch(err => {
//       res.status(400).send(`Unable to get to database...`);
//     });
// };

//delete model
exports.delete_Model = (req, res) => {
  model
    .deleteMany({ movieId: req.params.id }, (err, item) => {
      if (err) {
        res.json("Data not found");
      } else {
        res.json("successfully deleted");
      }
    })
    .catch(err => console.log(err));
};

//recommend movie
exports.moviesRecommended = (req, res) => {
  model
    .find((err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send(`Something went wrong...`);
      } else {
        let data = items; // list of movies in db
        let movie = req.body.id; //input movie
        let movieIndex = 0;
        let matrix = []; // matrix storing result
        //find input movie index
        for (let i = 0; i < data.length; i++) {
          if (data[i].movieId == movie) {
            movieIndex = i;
            break;
          }
        }

        let featuresList = Object.keys(data[0].toObject());
        var movieIndexFeatures = 0;
        //count movie index features
        data[movieIndex].type != "" ? movieIndexFeatures++ : "";
        data[movieIndex].country != "" ? movieIndexFeatures++ : "";
        movieIndexFeatures += data[movieIndex].genres.length;
        for (let i = 0; i < data.length; i++) {
          if (data[movieIndex].movieId == data[i].movieId) continue;
          var similarities = 0; // số lượng features giống nhau
          var movieIFeatures = 0;
          //count movie i features
          data[i].type != "" ? movieIFeatures++ : "";
          data[i].country != "" ? movieIFeatures++ : "";
          movieIFeatures += data[i].genres.length;
          //so sanh country
          if (
            data[movieIndex].country == data[i].country &&
            data[movieIndex].country != "" &&
            data[i].country != ""
          ) {
            similarities++;
            console.log(data[movieIndex].country, data[i].country);
          }
          //so sanh type
          if (
            data[movieIndex].type == data[i].type &&
            data[movieIndex].type != "" &&
            data[i].type != ""
          ) {
            similarities++;
            console.log(data[movieIndex].type, data[i].type);
          }
          //so sanh genre
          data[movieIndex].genres.forEach(item => {
            let result = data[i].genres.indexOf(item);
            if (result != -1) {
              similarities++;
            }
          });
          console.log(
            // data[movieIndex].movieName,
            // data[i].movieName,
            // similarities
            movieIndexFeatures,
            movieIFeatures
          );
          matrix.push(
            similarities / (movieIndexFeatures + movieIFeatures - similarities)
          ); //tương quan giống nhau giữa data[movieIndex] và data[i]
        }
        // console.log(matrix);
        //sort
        var valueArray = [];
        var indexArr = [];

        //copy matrix to valueArray
        valueArray = [...matrix];

        // push index/name/id/... into array
        for (let i = 0; i < data.length; i++) {
          if (data[movieIndex].movieId == data[i].movieId) continue;
          indexArr.push(data[i].movieId);
        }

        //sort valueArray
        for (let i = 0; i < valueArray.length; i++) {
          for (let j = i + 1; j < valueArray.length; j++) {
            if (valueArray[j] > valueArray[i]) {
              //swap value
              let tempValue = valueArray[j];
              valueArray[j] = valueArray[i];
              valueArray[i] = tempValue;

              //swap index
              let tempIndex = indexArr[j];
              indexArr[j] = indexArr[i];
              indexArr[i] = tempIndex;
            }
          }
        }
        console.log(valueArray);
        // console.log(indexArr);
        if (indexArr.length >= 5) {
          res.json(indexArr.slice(0, 5));
        } else {
          res.json(indexArr);
        }
      }
    })
    .catch(err => {
      res.status(400).send(`Unable to get to database...`);
    });
};
