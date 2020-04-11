import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import callApi from "../../../utils/apiCaller";
import StarRatings from "react-star-ratings";
class ModalRating extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {
      user: localStorage.getItem("user"),
      rating: 0,
      comment: "",
      tags: [],
      tag: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }
  close() {
    this.props.onClickClose();
  }
  componentDidMount() {}
  changeColor(newRating, name) {
    this.setState({
      rating: newRating
    });
  }

  onChangeComment(e) {
    this.setState({ comment: e.target.value });
  }
  onChangeTag(e) {
    this.setState({ tag: e.target.value });
  }
  onSubmit() {
    //add rating
    let obj = {
      user: this.state.user,
      movie: this.props.item._id,
      rating: this.state.rating,
      comment: this.state.comment
    };
    if (obj.rating === "") {
      alert("Vui lòng chọn đánh giá sao!");
    } else {
      callApi("rating", "post", obj).then(res => {
        if (res.data.data.includes("successfully")) {
          alert("Đã đánh giá thành công!");
          this.close();
        } else {
          alert("Đã có lỗi xảy ra!");
        }
      });
    }
    //add user tags
    let tags = this.state.tags;
    tags.forEach(item => {
      let tagObj = {
        user: this.state.user,
        movie: this.props.item._id,
        tag: item
      };
      callApi("userstags", "post", tagObj)
        .then()
        .catch(err => console.log(err));
    });
  }
  onKeyPress(e) {
    if (e.key === "Enter") {
      let arr = [...this.state.tags];
      arr.push(e.target.value);
      this.setState({ tags: arr, tag: "" });
    }
  }
  removeTag(tagName) {
    this.state.tags.splice(this.state.tags.indexOf(tagName), 1);
    this.setState({ tags: this.state.tags });
  }
  render() {
    let item = this.props.item;
    let tags = this.state.tags;
    let elTag = tags.map((item, index) => {
      return (
        <button className="btn btn-warning btn-sm mr-2 mt-2" key={index}>
          {item}
          <span
            className="badge badge-light badge-pill ml-2"
            onClick={() => this.removeTag(item)}
          >
            x
          </span>
        </button>
      );
    });
    return (
      <Modal show={true} onHide={this.close} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Đánh giá phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-sm table-borderless">
            <tbody>
              <tr>
                <td width="20%">Tên phim</td>
                <td>{item.vietnameseTitle}</td>
              </tr>
              <tr>
                <td>Đánh giá</td>
                <td>
                  <StarRatings
                    rating={this.state.rating}
                    starRatedColor="#ffc107"
                    starHoverColor="#ffc107"
                    starDimension="20px"
                    changeRating={this.changeColor}
                    numberOfStars={5}
                    name="rating"
                  />
                </td>
              </tr>
              <tr>
                <td>Tags</td>
                <td>
                  <input
                    className="form-control my-2"
                    value={this.state.tag}
                    onKeyPress={this.onKeyPress}
                    onChange={this.onChangeTag}
                  />
                  {elTag}
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
