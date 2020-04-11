import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchButton from "./SearchButton";
import callApi from "../../../utils/apiCaller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayMenuItem: true,
      isDisplayUsername: false,
      user: {}
    };
    this.signOut = this.signOut.bind(this);
  }
  componentDidMount() {
    let user = localStorage.getItem("user");
    if (user) {
      this.setState({
        isDisplayMenuItem: false,
        isDisplayUsername: true
      });
      //get user infomation
      callApi(`users/${user}`, "get", null)
        .then(res => {
          this.setState({ user: res.data });
        })
        .catch(err => console.log(err));
    }
  }
  signOut() {
    localStorage.removeItem("user");
    this.setState({
      isDisplayMenuItem: true,
      isDisplayUsername: false
    });
    alert("Đã đăng xuất!");
  }
  render() {
    return (
      <nav
        className="navbar navbar-expand-md navbar-white bg-white fixed-top"
        id="homepageHeader"
      >
        <button
          className="navbar-toggler bg-white"
          type="button"
          data-toggle="collapse"
          data-target="#header"
          aria-controls="header"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img src="/img/list.png" height="20px" />
        </button>
        <Link to="/" className="navbar-brand">
          <img src="/img/cinema.png" height="30px" />
        </Link>

        <div className="collapse navbar-collapse" id="header">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item px-1">
              <Link to="/" className="nav-link header-item ">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item px-1">
              <Link to="/admin" className="nav-link header-item">
                Admin
              </Link>
            </li>
            {this.state.isDisplayMenuItem && (
              <li className="nav-item px-1">
                <Link to="/sign-up" className="nav-link header-item">
                  Đăng ký
                </Link>
              </li>
            )}
            {this.state.isDisplayMenuItem && (
              <li className="nav-item px-1">
                <Link to="/sign-in" className="nav-link header-item">
                  Đăng nhập
                </Link>
              </li>
            )}
          </ul>
          <SearchButton />
          {this.state.isDisplayUsername && (
            <div className="btn-group mx-3">
              <span
                type="button"
                className="d-flex align-items-center"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <Avatar
                  name={this.state.user.username}
                  size={30}
                  round="20px"
                  color="#DE4150"
                  className="mr-1"
                  textSizeRatio={2}
                />
                {this.state.user.username}
              </span>
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  className="dropdown-item"
                  type="button"
                  to={`/users/${this.state.user._id}`}
                >
                  Thông tin cá nhân
                </Link>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={this.signOut}
                >
                  <span>Đăng xuất</span>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="text-dark mx-2"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
}
export default Header;
