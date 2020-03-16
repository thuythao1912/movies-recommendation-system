import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
class Panel extends Component {
  render() {
    return (
      <div className="bg-dark" style={{ minHeight: "100vh" }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item p-2 text-white bg-dark">
            <Link to="/" className="navbar-brand">
              <img src="/img/cinema.png" height="30px" />
            </Link>
            <span>Hi admin!</span>
            <FontAwesomeIcon icon={faSignOutAlt} className="mx-2" />
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
        </ul>
      </div>
    );
  }
}

export default Panel;
