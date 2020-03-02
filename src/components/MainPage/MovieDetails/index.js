import React, { Component } from "react";
import MovieInfo from "./Movie-Info";
import MovieRecommendation from "./Movie-Recommendation";
import callApi from "../../../utils/apiCaller";
class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { item: {}, genres: [] };
  }
  componentDidMount() {
    callApi(`movies/byid/${this.props.match.params.id}`, "get", null)
      .then(res => {
        this.setState({ item: res.data });
      })
      .catch(err => console.log(err));
    //get movie genres
    callApi(`moviesgenres/movie/${this.props.match.params.id}`, "get", null)
      .then(res => {
        this.setState({ genres: res.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="d-flex">
        <div className="col-sm-8 p-0">
          <MovieInfo item={this.state.item} genres={this.state.genres} />
        </div>
        <div className="col-sm-4">
          <MovieRecommendation />
        </div>
      </div>
    );
  }
}
export default MovieDetails;
