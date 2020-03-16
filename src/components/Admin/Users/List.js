import React, { Component } from "react";
import { Link } from "react-router-dom";
import callApi from "../../../utils/apiCaller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
class List extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], isShowModal: false, itemSelected: null };
    this.getUsers = this.getUsers.bind(this);
  }
  componentDidMount() {
    this.getUsers();
  }

  deleteMovie(movie, title) {
    if (window.confirm(`Bạn muốn xóa phim: ${title}`)) {
      //check if movies genres are existed
      callApi(`moviesgenres/movie/${movie}`, "get", null).then(res => {
        if (res.data.length > 0) {
          if (
            window.confirm(`Xóa phim sẽ xóa dữ liệu thể loại-phim. Tiếp tục?`)
          ) {
            //delete movies genres
            callApi(`movies/${movie}`, "delete", null).then(res => {
              if (res.data.includes("successfully")) {
                alert("Đã xóa thành công!");
                this.getMovies();
              } else {
                alert("Đã có lỗi xảy ra!");
              }
            });
            //delete model by movie id
            callApi(`train/bymovie/${movie}`, "delete", null).then();
          }
        } else {
          //delete movies genres
          callApi(`movies/${movie}`, "delete", null).then(res => {
            if (res.data.includes("successfully")) {
              alert("Đã xóa thành công!");
              this.getMovies();
            } else {
              alert("Đã có lỗi xảy ra!");
            }
          });
          //delete model by movie id
          callApi(`train/bymovie/${movie}`, "delete", null).then();
        }
      });
    }
  }
  getUsers() {
    callApi("users", "get", null)
      .then(res => {
        this.setState({ items: res.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    let items = this.state.items;
    //create rows
    let elItems = items.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>
            {/* <Link to={`/admin/users/edit/${item._id}`}>
              <FontAwesomeIcon icon={faEdit} className="text-info" />
            </Link> */}
            <button
              className="btn btn-link"
              onClick={() => this.deleteMovie(item._id, item.vietnameseTitle)}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="text-info" />
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div className="p-2">
        <h3 className="text-center">DANH SÁCH NGƯỜI DÙNG</h3>
          {/* <Link to="/admin/movies/add" className="text-decoration-none ">
            <button className="btn btn-info btn-sm">Thêm mới</button>
          </Link> */}
        <div className="bg-white">
          <table className="table table-sm my-2 table-striped table-bordered">
            <thead>
              <tr>
                <th width="10%">STT</th>
                <th width="30%">Tên người dùng</th>
                <th width="40%">Email</th>
                <th width="20%">Thao tác</th>
              </tr>
            </thead>
            <tbody>{elItems}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default List;
