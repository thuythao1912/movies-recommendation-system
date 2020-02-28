import React, { Component } from "react";
import { Link } from "react-router-dom";
class List extends Component {
  render() {
    return (
      <div>
        <h3 className="text-center">DANH SÁCH PHIM</h3>
        <Link to="/admin/movies/add" className="text-decoration-none ">
          <button className="btn btn-info btn-sm">Thêm mới</button>
        </Link>
      </div>
    );
  }
}
export default List;
