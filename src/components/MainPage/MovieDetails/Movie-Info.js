import React, { Component } from "react";
import callApi from "../../../utils/apiCaller";
class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { country: "" };
  }
  componentWillReceiveProps() {
    if (this.props.item.hasOwnProperty("_id")) {
      callApi(`countries/${this.props.item.country}`, "get", null)
        .then(res => {
          this.setState({ country: res.data.name });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    let item = this.props.item;
    let genres = this.props.genres;
    var elGenres = genres.map((item, index) => {
      return <span key={index}>{item.genre.name}, </span>;
    });
    return (
      <div className="border py-3">
        <div className="d-flex ">
          <div className="col-lg-4">
            <img src={item.poster} className="poster" />
          </div>
          <div className="col-lg-8">
            <h3 className="text-uppercase">{item.vietnameseTitle}</h3>
            <h6 className="text-muted">{item.originalTitle}</h6>
            <div>5 sao</div>
            <hr />
            <table className="table table-sm table-borderless">
              <tbody>
                <tr>
                  <td width="25%">Thể loại</td>
                  <td>{elGenres}</td>
                </tr>
                <tr>
                  <td>Năm</td>
                  <td>{item.year}</td>
                </tr>
                <tr>
                  <td>Khởi chiếu</td>
                  <td>{item.openingDay}</td>
                </tr>
                <tr>
                  <td>Thời lượng</td>
                  <td>{item.duration} phút</td>
                </tr>
                <tr>
                  <td>Quốc gia</td>
                  <td>{this.state.country}</td>
                </tr>
                <tr>
                  <td>Nhà sản xuất</td>
                  <td>{item.producers}</td>
                </tr>
                <tr>
                  <td>Loại phim</td>
                  <td>{item.type}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-sm-12 my-2">
          <h6>Nội dung phim</h6>
          <p className="text-justify">{item.overview}</p>
        </div>
        <div className="col-sm-12 my-2">
          <iframe
            width="100%"
            height="450"
            src={item.trailer}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  }
}
export default MovieInfo;
