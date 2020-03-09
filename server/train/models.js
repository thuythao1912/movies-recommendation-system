const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Int32 = require("mongoose-int32");
const model = new Schema(
  {
    movieId: { type: Schema.Types.ObjectId },
    movieName: { type: String },
    country: { type: String },
    type: { type: String },
    year: { type: String },
    isTinhCam: { type: Boolean },
    isVienTuong: { type: Boolean },
    isHanhDong: { type: Boolean },
    isHaiHuoc: { type: Boolean },
    isCoTrang: { type: Boolean },
    isHoatHinh: { type: Boolean },
    isTaiLieu: { type: Boolean },
    isHinhSu: { type: Boolean },
    isKinhDi: { type: Boolean }
  },
  { timestamps: true }
);

module.exports = mongoose.model("model", model);
