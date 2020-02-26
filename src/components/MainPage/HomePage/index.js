import React, { Component } from "react";
import HotMovies from "./HotMovies";
import NewMovieCard from "./New-Movie-Card";
class HomePage extends Component {
  render() {
    return (
      <div className="d-flex">
        <div className="col-sm-9">
          <HotMovies />
        </div>
        <div className="col-sm-3">
          <h6>Phim mới</h6>
          <NewMovieCard />
        </div>
      </div>
    );
  }
}
export default HomePage;
