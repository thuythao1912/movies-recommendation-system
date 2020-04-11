import React, { Component } from "react";
import MovieCard from "./Movie-Card";
import callApi from "../../../utils/apiCaller";
import Pagination from "../../Pagination";
class HotMovies extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], currentPage: 1, limit: 10 };
    this.handleSelectedPage = this.handleSelectedPage.bind(this);
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  handleSelectedPage(page) {
    this.setState({ currentPage: page });
    this.getData();
  }
  getData() {
    callApi(
      `movies?page=${this.state.currentPage}&limit=${this.state.limit}`,
      "get",
      null
    )
      .then((res) => {
        this.setState({ items: res.data });
      })
      .catch((err) => console.log(err));
  }
  render() {
    var items = this.state.items;
    var elItems = items.map((item, index) => {
      return <MovieCard item={item} key={index} />;
    });
    return (
      <div>
        <div className="d-flex flex-wrap">{elItems}</div>
        <div className="my-3">
          <Pagination
            collection="movies"
            limit={this.state.limit}
            handleSelectedPage={this.handleSelectedPage}
          />
        </div>
      </div>
    );
  }
}
export default HotMovies;
