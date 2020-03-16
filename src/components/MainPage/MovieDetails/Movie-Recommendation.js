import React, { Component } from "react";
import MovieCardSide from "../HomePage/Movie-Card-Side";
class MovieRecommendation extends Component {
  render() {
    let elMoviesRecommended = this.props.items.map((movie, index) => {
      return <MovieCardSide item={movie} key={index} />;
    });
    return (
      <div>
        <h6>Bạn có thể thích</h6>
        {elMoviesRecommended}
      </div>
    );
  }
}
export default MovieRecommendation;
