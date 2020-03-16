import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/reducers";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }
  render() {
    console.log(this.props.isLoginSuccess);
    let { isLoginPending, isLoginSuccess, isLoginFailure } = this.props;
    if (isLoginSuccess) {
      alert("Đăng nhập thành công!");
      return <Redirect to="/" />;
    }
    return (
      <div
        className="bg-success "
        style={{ height: "100%", minHeight: "100vh" }}
      >
        <div
          className="col-sm-5 py-5"
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
                  type="text"
                  className="form-control form-control-md"
                  placeholder="Nhập mật khẩu"
                  required
                  name="password"
                  onChange={this.handleInputChange}
                />
                <span className="text-danger">&nbsp;(*)</span>
              </div>
              <div>
                {isLoginPending && <div>Please wait...</div>}
                {isLoginSuccess && <div>Success.</div>}
                {isLoginFailure && <div>{isLoginFailure.message}</div>}
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

const mapStateToProps = state => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    isLoginFailure: state.isLoginFailure
  };
};

const dispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(login(username, password))
  };
};

export default connect(mapStateToProps, dispatchToProps)(SignIn);
