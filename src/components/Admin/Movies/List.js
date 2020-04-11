import React, { Component } from "react";
import { Link } from "react-router-dom";
import callApi from "../../../utils/apiCaller";
import ModalDetails from "./Modal-Details";
import Pagination from "../../Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isShowModal: false,
      itemSelected: null,
      limit: 10,
      currentPage: 1,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.getData = this.getData.bind(this);
    this.handleSelectedPage = this.handleSelectedPage.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  openModal(item) {
    this.setState({ isShowModal: true, itemSelected: item });
  }
  closeModal() {
    this.setState({ isShowModal: false });
  }
  async deleteMovie(movie, title) {
    if (window.confirm(`Bạn muốn xóa phim: ${title}?`)) {
      //check if ratings are existing
      callApi(`rating?movie=${movie}`, "get", null)
        .then((res) => {
          if (res.data.length > 0) {
            if (
              window.confirm(`Xóa phim sẽ xóa dữ liệu đánh giá phim. Tiếp tục?`)
            ) {
              //delete movie rating
              callApi(`rating/byobject?movie=${movie}`, "delete", null).then();
              //check if movies genres are existing
              callApi(`moviesgenres/movie/${movie}`, "get", null)
                .then((res) => {
                  if (res.data.length > 0) {
                    //delete movies genres
                    callApi(
                      `moviesgenres/movie/${movie}`,
                      "delete",
                      null
                    ).then();
                  }
                  //delete movie
                  callApi(`movies/${movie}`, "delete", null).then();
                  //delete model by movie id
                  callApi(`train/bymovie/${movie}`, "delete", null).then();
                  alert("Đã xóa phim thành công!");
                  this.getData();
                })
                .catch((err) => console.log(err));
            }
          } else {
            //check if movies genres are existing
            callApi(`moviesgenres/movie/${movie}`, "get", null)
              .then((res) => {
                if (res.data.length > 0) {
                  //delete movies genres
                  callApi(`moviesgenres/movie/${movie}`, "delete", null).then();
                }
                //delete movie
                callApi(`movies/${movie}`, "delete", null).then();
                //delete model by movie id
                callApi(`train/bymovie/${movie}`, "delete", null).then();
                alert("Đã xóa phim thành công!");
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  }

  getData() {
    callApi(
      `movies?page=${this.state.currentPage}&limit=${this.state.limit}`,
      "get",
      null
    )
      .then((res) => {
        this.setState({ items: res.data });
        console.log(this.state.items);
      })
      .catch((err) => console.log(err));
  }
  handleSelectedPage(page) {
    this.setState({ currentPage: page });
    this.getData();
  }
  render() {
    let items = this.state.items;
    //create rows
    let elItems = items.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1 + this.state.limit * (this.state.currentPage - 1)}</td>
          <td>{item.vietnameseTitle}</td>
          <td>{item.originalTitle}</td>
          <td>
            {item.type == "PhimBo"
              ? "Phim bộ"
              : item.type == "PhimLe"
              ? "Phim lẻ"
              : ""}
          </td>
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
    console.log("r");
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
        <Pagination
          collection="movies"
          limit={this.state.limit}
          handleSelectedPage={this.handleSelectedPage}
        />
      </div>
    );
  }
}
export default List;
