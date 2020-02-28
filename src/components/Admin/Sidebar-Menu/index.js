import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
class Panel extends Component {
  render() {
    return (
      <div className="bg-dark" style={{ minHeight: "96vh" }}>
        <ul className="list-group list-group-flush">
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
              to="/admin/items"
              className="text-decoration-none text-white"
              activeClassName="font-weight-bold"
            >
              Items
            </NavLink>
          </li>
          <li className="list-group-item p-2 text-white bg-dark">
            <NavLink
              to="/admin/accounts-items"
              className="text-decoration-none text-white"
              activeClassName="font-weight-bold"
            >
              Users-Items
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
