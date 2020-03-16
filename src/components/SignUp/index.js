import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bg-dark " style={{ height: "100%", minHeight: "100vh" }}>
        <div
          className="col-sm-5 py-5"
          style={{ margin: "auto", minHeight: "70vh" }}
        >
          <h3 className="text-center text-white">ĐĂNG KÝ THÀNH VIÊN</h3>
          <div
            className="border py-5 bg-white"
            style={{
              minHeight: "60vh"
            }}
          >
            <form className="col-sm-10 ml-auto mr-auto">
              <div className="d-flex col-sm-12 mb-3">
                <input
                  type="text"
                  className="form-control form-control-md"
                  placeholder="Nhập tên đăng nhập"
                  required
                  name="originalTitle"
                />
                <span className="text-danger">&nbsp;(*)</span>
              </div>
              <div className="d-flex col-sm-12 mb-3">
                <input
                  type="text"
                  className="form-control form-control-md"
                  placeholder="Nhập mật khẩu"
                  required
                  name="originalTitle"
                />
                <span className="text-danger">&nbsp;(*)</span>
              </div>
              <div className="d-flex col-sm-12 mb-3">
                <input
                  type="text"
                  className="form-control form-control-md"
                  placeholder="Nhập email"
                  required
                  name="originalTitle"
                />
                <span className="text-danger">&nbsp;(*)</span>
              </div>
              <div className="my-3 text-center">
                <button className="btn btn-success mx-1" type="submit">
                  Lưu
                </button>
                <Link to="/">
                  <button className="btn btn-danger mx-1">Trở về</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
