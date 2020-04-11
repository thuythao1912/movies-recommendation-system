import React, { Component } from "react";
import MovieInfo from "./Movie-Info";
import MovieRecommendation from "./Movie-Recommendation";
import callApi from "../../../utils/apiCaller";
import PageNotFound from "../../Admin/PageNotFound";
class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      genres: [],
      moviesrecommended: [],
      rating: ""
    };
    this.getData = this.getData.bind(this);
  }
  getData(movieId) {
    callApi(`movies/byid/${movieId}`, "get", null)
      .then(res => {
        this.setState({ item: res.data });
        if (this.state.item != null) {
          //get movie genres
          callApi(`moviesgenres/movie/${movieId}`, "get", null)
            .then(res => {
              this.setState({ genres: res.data });
            })
            .catch(err => console.log(err));
          //get movies recommended
          let id = { id: movieId };
          callApi("train/recommend", "post", id)
            .then(res => {
              this.setState({ moviesrecommended: res.data });
            })
            .catch(err => console.log(err));
          //get movie rating
          callApi(`rating/bymovie/${movieId}`, "get", null)
            .then(res => {
              this.setState({ rating: res.data });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getData(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.getData(nextProps.match.params.id);
    }
  }

  render() {
    console.log(this.state.item);
    if (this.state.item == null) {
      return <PageNotFound />;
    } else {
      return (
        <div className="d-flex">
          <div className="col-sm-9 p-0">
            <MovieInfo
              item={this.state.item}
              genres={this.state.genres}
              rating={this.state.rating}
            />
          </div>
          <div className="col-sm-3">
            <MovieRecommendation items={this.state.moviesrecommended} />
          </div>
        </div>
      );
    }
  }
}
export default MovieDetails;
