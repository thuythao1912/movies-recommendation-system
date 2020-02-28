import React, { Component } from "react";
class AddForm extends Component {
  render() {
    let years = [];
    for (let i = 1900; i <= new Date().getFullYear() + 2; i++) {
      years.push(i);
    }
    let elYears = years.map((item, index) => {
      return <option key={index}>{item}</option>;
    });
    return (
      <div className="my-2 p-2">
        <h3 className="">THÊM PHIM MỚI</h3>
        <div
          className="col-sm-12 border bg-white py-2 "
          style={{ minHeight: "97vh" }}
        >
          <div className="d-flex my-1">
            {/* Tên phim */}
            <div className="col-sm-4">
              <label htmlFor="txtVietnameseTitle ">Tên phim</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Nhập tên phim"
                />
                <span className="text-danger">&nbsp;(*)</span>
              </div>
            </div>
            {/* Tên gốc */}
            <div className="col-sm-4">
              <label htmlFor="txtOriginalTitle ">Tên gốc</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Nhập tên gốc"
                />
                <span className="text-danger">&nbsp;(*)</span>
              </div>
            </div>
            {/* Quốc gia */}
            <div className="col-sm-4">
              <label>Quốc gia</label>
              <div className="d-flex">
                <select className="form-control form-control-sm">
                  <option>Chọn quốc gia</option>
                </select>
                <span className="text-danger">&nbsp;(*)</span>
              </div>
            </div>
          </div>
          <div className="d-flex my-1">
            {/* Thể loại */}
            <div className="col-sm-4">
              <label>Thể loại</label>
              <div className="d-flex">
                <select className="form-control form-control-sm">
                  <option>Chọn thể loại</option>
                </select>
                <span className="text-danger">&nbsp;(*)</span>
              </div>
            </div>
            {/* Loại phim */}
            <div className="col-sm-4">
              <label>Loại</label>
              <div className="d-flex">
                <select className="form-control form-control-sm">
                  <option value="-1">Chọn loại phim</option>
                  <option value="Phim lẻ">Phim lẻ</option>
                  <option value="Phim bộ"></option>
                </select>
                <span className="text-danger">&nbsp;(*)</span>
              </div>
            </div>
            {/* Thời lượng */}
            <div className="col-sm-4">
              <label>Thời lượng</label>
              <div className="d-flex">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Nhập thời lượng"
                />
                <span className="text-danger">&nbsp;(*)</span>
              </div>
            </div>
          </div>

          <div className="d-flex my-1">
            {/* Năm sản xuất */}
            <div className="col-sm-2">
              <label>Năm sản xuất</label>
              <div className="d-flex">
                <select className="form-control form-control-sm">
                  <option className="form-control">Chọn năm </option>
                  {elYears}
                </select>{" "}
                <span className="text-danger">&nbsp;(*)</span>
              </div>
            </div>
            {/* Ngày khởi chiếu */}
            <div className="col-sm-4">
              <label>Ngày khởi chiếu</label>
              <div className="d-flex">
                <input
                  type="date"
                  className="form-control form-control-sm"
                  placeholder="Ngày khởi chiếu"
                />
                <span className="text-danger">&nbsp;(*)</span>
              </div>
            </div>
            {/* Nhà sản xuất */}
            <div className="col-sm-6">
              <label>Đạo diễn</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Nhập nhà sản xuất"
                />
                <span className="text-danger">&nbsp;(*)</span>
              </div>
            </div>
          </div>
          <div className="d-flex my-1">
            {/* Trailer */}
            <div className="col-sm-6">
              <label>Trailer</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Nhập link trailer youtube"
                />
                <span className="text-danger">&nbsp;(*)</span>
              </div>
            </div>
            {/* Poster */}
            <div className="col-sm-6">
              <label>Poster</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Nhập link poster"
                />
                <span className="text-danger">&nbsp;(*)</span>
              </div>
            </div>
          </div>
          <div className="d-flex">
            {/* Tóm tắt */}
            <div className="col-sm-12">
              <label>Nội dung</label>
              <div className="d-flex">
                <textarea className="form-control">Nhập nội dung phim</textarea>
                <span className="text-danger">&nbsp;(*)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddForm;
