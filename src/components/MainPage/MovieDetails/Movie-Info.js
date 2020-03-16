import React, { Component } from "react";
import ModalRating from "./Modal-Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import callApi from "../../../utils/apiCaller";
class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { country: "", isShowModal: false, item: {}, render: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentWillReceiveProps() {
    if (this.props.item.hasOwnProperty("_id")) {
      callApi(`countries/${this.props.item.country}`, "get", null)
        .then(res => {
          this.setState({ country: res.data.name });
          if (this.props.item.poster == "") {
            this.props.item.poster = "/img/404.png";
          }
        })
        .catch(err => console.log(err));
    }
  }

  openModal(item) {
    this.setState({ isShowModal: true, item: item });
  }
  closeModal() {
    this.setState({ isShowModal: false });
  }

  render() {
    let item = this.props.item;
    let genres = this.props.genres;
    var elGenres = genres.map((item, index) => {
      return <span key={index}>{item.genre.name}, </span>;
    });
    //create modal
    let elModal = "";
    if (this.state.isShowModal) {
      elModal = (
        <ModalRating
          isShowModal={this.state.isShowModal}
          onClickClose={this.closeModal}
          item={this.state.item}
        />
      );
    }
    let elRating = "";
    if (this.props.rating !== "NaN") {
      elRating = (
        <span>
          {this.props.rating}{" "}
          <FontAwesomeIcon icon={faStar} className="text-warning" />
        </span>
      );
    }
    return (
      <div className="border py-3">
        {elModal}
        <div className="col-sm-12 mr-auto ml-auto">
          <div className="d-flex">
            <div className="col-lg-4">
              <div
                className="poster"
                style={{ backgroundImage: `url(${item.poster})` }}
              />
            </div>
            <div className="col-lg-8">
              <h3 className="text-uppercase">{item.vietnameseTitle}</h3>
              <h6 className="text-muted">{item.originalTitle}</h6>
              <div className="d-flex">
                <span>{elRating}</span>
                <button
                  className="ml-auto btn btn-info btn-sm"
                  onClick={() => this.openModal(item)}
                >
                  Đánh giá
                </button>
              </div>
              <hr />
              <table className="table table-sm table-borderless">
                <tbody>
                  <tr>
                    <td width="25%">Thể loại</td>
                    <td>{elGenres}</td>
                  </tr>
                  <tr>
                    <td>Năm</td>
                    <td>{item.year}</td>
                  </tr>
                  <tr>
                    <td>Khởi chiếu</td>
                    <td>{item.openingDay}</td>
                  </tr>
                  <tr>
                    <td>Thời lượng</td>
                    <td>{item.duration} phút</td>
                  </tr>
                  <tr>
                    <td>Quốc gia</td>
                    <td>{this.state.country}</td>
                  </tr>
                  <tr>
                    <td>Nhà sản xuất</td>
                    <td>{item.producers}</td>
                  </tr>
                  <tr>
                    <td>Loại phim</td>
                    <td>
                      {item.type == "PhimBo"
                        ? "Phim bộ"
                        : item.type == "PhimLe"
                        ? "Phim lẻ"
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-sm-12 my-2">
            <h6>Nội dung phim</h6>
            <p className="text-justify">{item.overview}</p>
          </div>
          <div className="col-sm-12 my-2">
            <iframe
              width="100%"
              height="450"
              src={item.trailer}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    );
  }
}
export default MovieInfo;
