import React, { Component } from "react";
import { Link } from "react-router-dom";
import callApi from "../../../utils/apiCaller";
import ModalDetails from "./Modal-Details";
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
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.getMovies = this.getMovies.bind(this);
  }
  componentDidMount() {
    this.getMovies();
  }
  openModal(item) {
    this.setState({ isShowModal: true, itemSelected: item });
  }
  closeModal() {
    this.setState({ isShowModal: false });
  }
  deleteMovie(movie, title) {
    if (window.confirm(`Bạn muốn xóa phim: ${title}`)) {
      callApi(`movies/${movie}`, "delete", null).then(res => {
        if (res.data == "fk") {
          alert("Vui lòng xóa thể loại phim trước!");
        } else if (res.data.includes("successfully")) {
          alert("Đã xóa thành công!");
          this.getMovies();
        }
      });
    }
  }
  getMovies() {
    callApi("movies", "get", null)
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
          <td>{item.vietnameseTitle}</td>
          <td>{item.originalTitle}</td>
          <td>{item.type}</td>
          <td>{item.year}</td>
          <td>{item.producers}</td>
          <td>
            <button className="btn btn-link">
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-info"
                onClick={() => this.openModal(item)}
              />
            </button>
            <Link to={`/admin/movies/edit/${item._id}`}>
              <FontAwesomeIcon icon={faEdit} className="text-info" />
            </Link>
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
    //create modal
    let elModal = "";
    if (this.state.isShowModal) {
      elModal = (
        <ModalDetails
          item={this.state.itemSelected}
          isShowModal={this.state.isShowModal}
          onClickClose={this.closeModal}
        />
      );
    }
    return (
      <div className="p-2">
        <h3 className="text-center">DANH SÁCH PHIM</h3>
        <Link to="/admin/movies/add" className="text-decoration-none ">
          <button className="btn btn-info btn-sm">Thêm mới</button>
        </Link>
        <div className="bg-white">
          <table className="table table-sm my-2 table-striped table-bordered">
            <thead>
              <tr>
                <th width="3%">STT</th>
                <th width="22%">Tên phim</th>
                <th width="20%">Tên gốc</th>
                <th width="10%">Loại</th>
                <th width="10%">Năm</th>
                <th width="20%">Đạo diễn</th>
                <th width="15%">Thao tác</th>
              </tr>
            </thead>
            <tbody>{elItems}</tbody>
          </table>
        </div>
        {elModal}
      </div>
    );
  }
}
export default List;
