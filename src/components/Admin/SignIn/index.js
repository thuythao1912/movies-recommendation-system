import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import callApi from "../../../utils/apiCaller";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      redirect: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    // callApi("users/login", "post", this.state).then(res => {
    //   if (res.data.user) {
    //     localStorage.setItem("user", res.data.jwt);
    //     this.setState({ redirect: true });
    //   } else {
    //     this.setState({ message: "Sai tên đăng nhập hoặc mật khẩu!" });
    //   }
    // });
    if (this.state.username == "admin") {
      localStorage.setItem("admin", this.state.password);
      alert("Đăng nhập thành công!");
      window.location.href = "/admin";
      // this.setState({ redirect: true });
    } else {
      this.setState({ message: "Sai tên đăng nhập hoặc mật khẩu!" });
    }
  }
  render() {
    return (
      <div className="bg-info " style={{ height: "100%", minHeight: "100vh" }}>
        <div
          className="col-lg-5 col-md-8 py-5"
          style={{ margin: "auto", minHeight: "70vh" }}
        >
          <h3 className="text-center text-white">ĐĂNG NHẬP</h3>
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
              <div className="d-flex col-sm-12 mb-3">
                {this.state.message && (
                  <small className="text-danger">{this.state.message}</small>
                )}
              </div>
              <div className="my-3 text-center">
                <button className="btn btn-success mx-1" type="submit">
                  Đăng nhập
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

export default SignIn;
