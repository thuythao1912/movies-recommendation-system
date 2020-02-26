import React, { Component } from "react";
class NewMovieCard extends Component {
  render() {
    return (
      <div className="d-flex border my-3 movie-card">
        <div className="col-sm-5 p-0">
          <div
            className="thumbnail-movie-sec"
            style={{ backgroundImage: "url(https://i.imgur.com/plLvz9w.jpg)" }}
          />
        </div>
        <div className="col-sm-7 p-2">
          <h6 className="card-title text-info m-0">
            Yêu em từ cái nhìn đầu tiên
          </h6>
          <small className="">Just One Slight Smile is Very Alluring</small>
        </div>
      </div>
    );
  }
}
export default NewMovieCard;
