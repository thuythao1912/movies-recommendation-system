import React, { Component } from "react";
import MovieCard from "./Movie-Card";
import callApi from "../../../utils/apiCaller";
class HotMovies extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
  componentDidMount() {
    callApi("movies", "get", null)
      .then(res => {
        this.setState({ items: res.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    var items = this.state.items;
    var elItem = items.map((item, index) => {
      return <MovieCard item={item} key={index} />;
    });
    return (
      <div>
        <h6>Phim đề cử</h6>
        <div className="d-flex flex-wrap">{elItem}</div>
      </div>
    );
  }
}
export default HotMovies;
