import React, { Component } from "react";
import MovieCard from "../HomePage/Movie-Card";
import callApi from "../../../utils/apiCaller";
export default class SearchMovie extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
  componentDidMount() {
    let title = { title: this.props.match.params.movie };
    callApi("movies/bytitle", "post", title).then(res => {
      this.setState({ items: res.data });
    });
  }
  render() {
    let items = this.state.items;
    let elItems = items.map((item, index) => {
      return <MovieCard item={item} key={index} />;
    });
    return (
      <div className="col-sm-12">
        <h6>
          Kết quả tìm kiếm cho từ khóa "
          <span className="text-danger">{this.props.match.params.movie}"</span>
        </h6>
        <div className="d-flex flex-wrap ">{elItems}</div>
      </div>
    );
  }
}
