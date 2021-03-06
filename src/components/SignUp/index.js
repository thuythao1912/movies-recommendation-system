import React, { Component } from "react";
import { Link } from "react-router-dom";
import callApi from "../../utils/apiCaller";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      message: "",
      checkPassword: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value, message: "" });
    if (e.target.name == "password") {
      if (this.state.password.length < 6) {
        this.setState({ checkPassword: "Mật khẩu ít nhất 6 ký tự!" });
      } else {
        this.setState({ checkPassword: "" });
      }
    }
  }
  onSubmit(e) {
    e.preventDefault();
    let obj = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    callApi("users", "post", obj)
      .then(res => {
        if (res.data.message) {
          this.setState({ message: res.data.message });
        } else {
          alert("Thêm thành công!");
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="bg-dark " style={{ height: "100%", minHeight: "100vh" }}>
        <div
          className="col-lg-5 col-md-8 py-5"
          style={{ margin: "auto", minHeight: "70vh" }}
        >
          <h3 className="text-center text-white">ĐĂNG KÝ THÀNH VIÊN</h3>
          <div
            className="border py-5 bg-white"
            style={{
              minHeight: "60vh"
            }}
          >
            <form
              className="col-sm-10 ml-auto mr-auto"
              onSubmit={this.onSubmit}
            >
              <div className="d-flex col-sm-12 mb-3">
                <input
                  type="text"
                  className="form-control form-control-md"
                  placeholder="Nhập tên đăng nhập"
                  required
                  name="username"
                  onChange={this.handleInputChange}
                />
                <span className="text-danger">&nbsp;(*)</span>
              </div>
              <div className="d-flex col-sm-12 mb-3">
                <input
                  type="password"
                  className="form-control form-control-md"
                  placeholder="Nhập mật khẩu"
                  required
                  name="password"
                  onChange={this.handleInputChange}
                />
                <span className="text-danger">&nbsp;(*)</span>
              </div>
              <div className="col-sm-12 mb-3">
                {this.state.checkPassword && (
                  <small className="text-danger">
                    {this.state.checkPassword}
                  </small>
                )}
              </div>
              <div className="d-flex col-sm-12 mb-3">
                <input
                  type="email"
                  className="form-control form-control-md"
                  placeholder="Nhập email"
                  required
                  name="email"
                  onChange={this.handleInputChange}
                />
                <span className="text-danger">&nbsp;(*)</span>
              </div>
              <div className="d-flex col-sm-12 mb-3">
                {this.state.message && (
                  <small className="text-danger">{this.state.message}</small>
                )}
              </div>
              <div className="my-3 text-center">
                <button className="btn btn-success mx-1" type="submit">
                  Đăng ký
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
