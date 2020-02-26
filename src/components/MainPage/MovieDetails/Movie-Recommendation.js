import React, { Component } from "react";
import NewMovieCard from "../HomePage/New-Movie-Card";
class MovieRecommendation extends Component {
  render() {
    return (
      <div>
        <h6>Bạn có thể thích</h6>
        <NewMovieCard />
      </div>
    );
  }
}
export default MovieRecommendation;
