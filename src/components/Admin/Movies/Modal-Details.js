import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import callApi from "../../../utils/apiCaller";
class ModalDetails extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.state = { genres: [], country: "" };
  }
  close() {
    this.props.onClickClose();
  }
  componentDidMount() {
    //get movie genres
    callApi(`moviesgenres/movie/${this.props.item._id}`, "get", null)
      .then(res => {
        this.setState({ genres: res.data });
      })
      .catch(err => console.log(err));
    //get country
    callApi(`countries/${this.props.item.country}`, "get", null)
      .then(res => {
        this.setState({ country: res.data.name });
      })
      .catch(err => console.log(err));
  }
  render() {
    let item = this.props.item;
    let genres = this.state.genres;
    var elGenres = genres.map((item, index) => {
      return <span key={index}>{item.genre.name}, </span>;
    });
    return (
      <Modal show={true} onHide={this.close} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chi tiết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-sm table-borderless">
            <tbody>
              <tr>
                <td width="20%">Tên phim</td>
                <td>{item.vietnameseTitle}</td>
              </tr>

              <tr>
                <td>Tên gốc</td>
                <td>{item.originalTitle}</td>
              </tr>
              <tr>
                <td>Thể loại</td>
                <td>{elGenres}</td>
              </tr>
              <tr>
                <td>Quốc gia</td>
                <td>{this.state.country}</td>
              </tr>
              <tr>
                <td>Loại</td>
                <td>{item.type}</td>
              </tr>

              <tr>
                <td>Thời lượng</td>
                <td>{item.duration}</td>
              </tr>
              <tr>
                <td>Năm sản xuất</td>
                <td>{item.year}</td>
              </tr>
              <tr>
                <td>Ngày khởi chiếu</td>
                <td>{item.openingDay}</td>
              </tr>
              <tr>
                <td>Đạo diễn</td>
                <td>{item.producers}</td>
              </tr>
              <tr>
                <td>Trailer</td>
                <td>
                  <a href={item.trailer} target="_blank">
                    {item.trailer}
                  </a>
                </td>
              </tr>
              <tr>
                <td>Poster</td>
                <td>
                  <img src={item.poster} width="100px" />
                </td>
              </tr>
              <tr>
                <td>Nội dung</td>
                <td className="text-justify">{item.overview}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close} variant="danger">
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ModalDetails;
