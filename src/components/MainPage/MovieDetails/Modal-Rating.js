import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import callApi from "../../../utils/apiCaller";
class ModalRating extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {
      ratingNumber: [],
      user: localStorage.getItem("user"),
      rating: "",
      comment: ""
    };
    this.createRatingNumber = this.createRatingNumber.bind(this);
    this.getRating = this.getRating.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
  }
  close() {
    this.props.onClickClose();
  }
  componentDidMount() {
    this.createRatingNumber();
  }
  createRatingNumber() {
    let arr = [];
    for (let i = 1; i <= 5; i++) {
      let button = (
        <button
          key={i}
          id={`rating_${i}`}
          className={`btn btn-warning btn-sm mr-2`}
          onClick={() => this.getRating(i)}
        >
          {i}
        </button>
      );
      arr.push(button);
    }
    this.setState({ ratingNumber: arr });
  }
  getRating(value) {
    this.setState({ rating: value });
  }
  onChangeComment(e) {
    this.setState({ comment: e.target.value });
  }
  onSubmit() {
    let obj = {
      user: this.state.user,
      movie: this.props.item._id,
      rating: this.state.rating,
      comment: this.state.comment
    };
    console.log(obj);
    if (obj.rating === "") {
      alert("Vui lòng chọn đánh giá sao!");
    } else {
      callApi("rating", "post", obj).then(res => {
        // console.log(res.data);
        if (res.data.data.includes("successfully")) {
          alert("Đã đánh giá thành công!");
          this.close();
        } else {
          alert("Đã có lỗi xảy ra!");
        }
      });
    }
  }
  render() {
    let item = this.props.item;
    return (
      <Modal show={true} onHide={this.close} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Đánh giá phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-sm table-borderless">
            <tbody>
              <tr>
                <td width="30%">Tên phim</td>
                <td>{item.vietnameseTitle}</td>
              </tr>
              <tr>
                <td>Đánh giá</td>
                <td>
                  {this.state.ratingNumber} &nbsp;{this.state.rating} sao
                </td>
              </tr>
              <tr>
                <td>Bình luận</td>
                <td>
                  <textarea
                    className="form-control my-2"
                    value={this.state.comment}
                    onChange={this.onChangeComment}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.onSubmit}>
            Lưu
          </Button>
          <Button onClick={this.close} variant="danger">
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ModalRating;
