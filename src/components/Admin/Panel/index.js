import React, { Component } from "react";
import { Link } from "react-router-dom";
class Panel extends Component {
  render() {
    return (
      <div className="col-sm-2 p-0">
        <div className="p-0 bg-dark" style={{ minHeight: "96vh" }}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item p-2 text-white bg-dark">
              <Link
                to="/admin/users"
                className="text-decoration-none text-white"
              >
                Users
              </Link>
            </li>
            <li className="list-group-item p-2 text-white bg-dark">
              <Link
                to="/admin/items"
                className="text-decoration-none text-white"
              >
                Items
              </Link>
            </li>
            <li className="list-group-item p-2 text-white bg-dark">
              <Link
                to="/admin/accounts-items"
                className="text-decoration-none text-white"
              >
                Users-Items
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Panel;
