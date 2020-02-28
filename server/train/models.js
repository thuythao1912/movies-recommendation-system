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
    isTinhCam: { type: Int32 },
    isVienTuong: { type: Int32 },
    isHanhDong: { type: Int32 },
    isHaiHuoc: { type: Int32 },
    isCoTrang: { type: Int32 },
    isHoatHinh: { type: Int32 },
    isTaiLieu: { type: Int32 },
    isHinhSu: { type: Int32 },
    isKinhDi: { type: Int32 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("model", model);
