import React, { Component } from "react";
import MovieCard from "../HomePage/Movie-Card";
import callApi from "../../../utils/apiCaller";
export default class SearchMovie extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    this.getData(this.props.match.params.field, this.props.match.params.value);
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.field !== this.props.match.params.field ||
      nextProps.match.params.value !== this.props.match.params.value
    ) {
      this.getData(nextProps.match.params.field, nextProps.match.params.value);
    }
  }
  getData(field, value) {
    let obj = { field: field, value: value };
    callApi("movies/byfieldname", "post", obj).then(res => {
      console.log(field);
      if (field == "genres") {
        let arr = [];
        res.data.map(item => {
          arr.push(item.movie);
        });
        this.setState({ items: arr });
      } else if (field == "country") {
        this.setState({ items: res.data });
      }
    });
  }
  render() {
    let items = this.state.items;
    console.log(items);
    let elItems = items.map((item, index) => {
      return <MovieCard item={item} key={index} />;
    });
    return (
      <div className="col-sm-12">
        <h6>Hiển thị tất cả</h6>
        <div className="d-flex flex-wrap ">{elItems}</div>
      </div>
    );
  }
}
