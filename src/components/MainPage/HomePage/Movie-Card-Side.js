import React, { Component } from "react";
import { Link } from "react-router-dom";
import callApi from "../../../utils/apiCaller";
class MovieCardSide extends Component {
  constructor(props) {
    super(props);
    this.state = { item: {} };
    this.getData = this.getData.bind(this);
  }
  getData() {
    callApi(`movies/byid/${this.props.item}`, "get", null)
      .then(res => {
        this.setState({ item: res.data });
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.getData();
  }
  componentWillReceiveProps() {
    this.getData();
  }
  render() {
    let item = this.state.item;
    if (item.poster == "") {
      item.poster = "/img/404.png";
    }
    return (
      <div className="d-flex border my-3 movie-card">
        <div className="col-sm-4 p-0">
          <div
            className="thumbnail-movie-sec"
            style={{ backgroundImage: `url(${item.poster})` }}
          />
        </div>
        <div className="col-sm-8 p-2">
          <h6 className="card-title text-info m-0">
            <Link to={`/movie-details/${item._id}`}>
              {item.vietnameseTitle}
            </Link>
          </h6>
          <small className="">{item.originalTitle}</small>
          <br />
          <small>{item.year}</small>
        </div>
      </div>
    );
  }
}
export default MovieCardSide;
