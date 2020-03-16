import React, { Component } from "react";
import HotMovies from "./HotMovies";

class HomePage extends Component {
  render() {
    return (
      <div className="d-flex">
        <div className="col-sm-12">
          <div className="d-flex my-2">
            <h6 className="mr-auto">Phim đề cử</h6>
          </div>
          <HotMovies />
        </div>
      </div>
    );
  }
}
export default HomePage;
