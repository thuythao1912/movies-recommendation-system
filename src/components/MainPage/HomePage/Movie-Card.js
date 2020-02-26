import React, { Component } from "react";
import { Link } from "react-router-dom";
class MovieCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let item = this.props.item;
    return (
      <div className="my-1 mx-1 movie-card border" style={{ width: "24%" }}>
        <div
          className="thumbnail-movie"
          style={{
            backgroundImage: `url(${item.poster})`
          }}
        />
        <div className="p-2">
          <Link to={`/movie-details/${item._id}`}>
            <h6 className="card-title text-uppercase m-0 text-info">
              {item.vietnameseTitle}
            </h6>
          </Link>
          <small className="text-muted">{item.originalTitle}</small>
          <p className="card-text">{item.year}</p>
        </div>
      </div>
    );
  }
}
export default MovieCard;
