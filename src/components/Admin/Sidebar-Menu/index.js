import React, { Component } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
class Panel extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.state = { redirect: false, adminName: localStorage.getItem("admin") };
  }
  signOut() {
    localStorage.removeItem("admin");
    this.setState({ redirect: true });
  }
  render() {
    if (this.state.redirect) {
      console.log("redirect to sign in");
      return <Redirect to="/admin/signin" />;
    }
    return (
      <div className="bg-dark" style={{ height: "100vh" }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item p-2 text-white bg-dark">
            <Link to="/" className="navbar-brand">
              <img src="/img/cinema.png" height="30px" />
            </Link>
            <span>Hi {this.state.adminName}!</span>
            <button className="btn btn-link text-white" onClick={this.signOut}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mx-2" />
            </button>
          </li>
          <li className="list-group-item p-2 text-white bg-dark">
            <NavLink
              to="/admin/users"
              className="text-decoration-none text-white"
              activeClassName="font-weight-bold"
            >
              Users
            </NavLink>
          </li>
          <li className="list-group-item p-2 text-white bg-dark">
            <NavLink
              to="/admin/movies"
              className="text-decoration-none text-white"
              activeClassName="font-weight-bold"
            >
              Movies
            </NavLink>
          </li>
          <li className="list-group-item p-2 text-white bg-dark">
            <NavLink
              to="/admin/rating"
              className="text-decoration-none text-white"
              activeClassName="font-weight-bold"
            >
              Rating
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Panel;
