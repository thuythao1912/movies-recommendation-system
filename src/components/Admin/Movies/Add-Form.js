import React, { Component } from "react";
import callApi from "../../../utils/apiCaller";
import { Link } from "react-router-dom";
class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      genres: [],
      originalTitle: "",
      vietnameseTitle: "",
      overview: "",
      country: "",
      year: "",
      openingDay: "",
      duration: "",
      producers: "",
      type: "",
      trailer: "",
      poster: "",
      checkboxGenres: []
    };
    this.getDropdownCountries = this.getDropdownCountries.bind(this);
    this.getCheckboxGenres = this.getCheckboxGenres.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.uncheck = this.uncheck.bind(this);
  }
  componentDidMount() {
    this.getDropdownCountries();
    this.getCheckboxGenres();
  }
  getDropdownCountries() {
    callApi("countries", "get", null)
      .then(res => {
        this.setState({ countries: res.data });
      })
      .catch(err => console.log(err));
  }
  getCheckboxGenres() {
    let arrGenres = [];
    callApi("genres", "get", null)
      .then(res => {
        arrGenres = res.data;
        arrGenres.forEach(item => {
          item.isChecked = false;
        });
        this.setState({ genres: arrGenres });
      })
      .catch(err => console.log(err));
  }
  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleCheckboxChange(e) {
    let genres = this.state.genres;
    genres.forEach(genre => {
      if (genre._id === e.target.value) {
        genre.isChecked = e.target.checked;
      }
    });
    this.setState({ genres: genres });
  }
  uncheck() {
    let genres = this.state.genres;
    genres.forEach(genre => {
      genre.isChecked = false;
    });
    this.setState({ genres: genres });
  }
  onSubmit(e) {
    e.preventDefault();
    let movie = {
      originalTitle: this.state.originalTitle,
      vietnameseTitle: this.state.vietnameseTitle,
      overview: this.state.overview,
      country: this.state.country,
      year: this.state.year,
      openingDay: this.state.openingDay,
      duration: this.state.duration,
      producers: this.state.producers,
      type: this.state.type,
      trailer: this.state.trailer,
      poster: this.state.poster
    };
    //add movie
    callApi("movies", "post", movie)
      .then(async res => {
        if (res.data.data.includes("successfully")) {
          //get _id of movie have been just created
          await callApi("movies/byfields", "post", {
            originalTitle: this.state.originalTitle,
            producers: this.state.producers,
            duration: this.state.duration
          }).then(res => {
            this.state.genres.forEach(genre => {
              if (genre.isChecked) {
                let moviegenre = { movie: res.data._id, genre: genre._id };
                //add movie genres
                callApi("moviesgenres", "post", moviegenre)
                  .then()
                  .catch(err => console.log(err));
              }
            });

            // add data to train
            let model = {
              genres: [],
              // isTinhCam: false,
              // isVienTuong: false,
              // isHanhDong: false,
              // isHaiHuoc: false,
              // isCoTrang: false,
              // isHoatHinh: false,
              // isTaiLieu: false,
              // isHinhSu: false,
              // isKinhDi: false,
              country: this.state.country,
              type: this.state.type,
              // year: this.state.year,
              movieId: res.data._id,
              movieName: this.state.vietnameseTitle
            };
            // for (let i = 0; i < this.state.genres.length; i++) {
            //   model[Object.keys(model)[i]] = this.state.genres[i].isChecked;
            // }
            this.state.genres.forEach(genre => {
              if (genre.isChecked) {
                model.genres.push(genre.name);
              }
            });
            callApi("train", "post", model)
              .then(res => console.log(res.data))
              .catch(err => console.log(err));
          });
          //uncheck all checkboxes
          this.uncheck();
          alert("Đã thêm thành công!");
          //set state to ""
          this.setState({
            originalTitle: "",
            vietnameseTitle: "",
            overview: "",
            country: "",
            year: "",
            openingDay: "",
            duration: "",
            producers: "",
            type: "",
            trailer: "",
            poster: ""
          });
        } else {
          alert("Đã có lỗi xảy ra!");
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    //dropdown years data
    let years = [];
    for (let i = new Date().getFullYear() + 2; i >= 1900; i--) {
      years.push(i);
    }
    let elYears = years.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
    //dropdown countries data
    let countries = this.state.countries;
    let elCountries = countries.map((item, index) => {
      return (
        <option value={item._id} key={index}>
          {item.name}
        </option>
      );
    });
    //checkbox genres data
    let genres = this.state.genres;
    let elGenres = genres.map((item, index) => {
      return (
        <div className="d-flex col-sm-2" key={index}>
          <input
            className="form-check-input"
            type="checkbox"
            value={item._id}
            id={`ck${item._id}`}
            onChange={this.handleCheckboxChange}
            checked={item.isChecked}
          />
          <label className="form-check-label mr-2" htmlFor={`ck${item._id}`}>
            {item.name}
          </label>
        </div>
      );
    });
    return (
      <div className="p-2">
        <h3>THÊM PHIM MỚI</h3>
        <form onSubmit={this.onSubmit}>
          <div className="col-sm-12 border bg-white py-2 ">
            <div className="d-flex my-1">
              {/* Tên phim */}
              <div className="col-sm-6">
                <label htmlFor="txtVietnameseTitle ">Tên phim</label>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nhập tên phim"
                    required
                    name="vietnameseTitle"
                    onChange={this.handleInputChange}
                    value={this.state.vietnameseTitle}
                  />
                  <span className="text-danger">&nbsp;(*)</span>
                </div>
              </div>
              {/* Tên gốc */}
              <div className="col-sm-6">
                <label htmlFor="txtOriginalTitle ">Tên gốc</label>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nhập tên gốc"
                    required
                    name="originalTitle"
                    onChange={this.handleInputChange}
                    value={this.state.originalTitle}
                  />
                  <span className="text-danger">&nbsp;(*)</span>
                </div>
              </div>
            </div>
            <div className="d-flex my-1">
              <div className="col-sm-12">
                <div>
                  <label>Chọn thể loại</label>
                </div>
                <div className="d-flex flex-wrap ml-2">{elGenres}</div>
              </div>
            </div>
            <div className="d-flex my-1">
              {/* Quốc gia */}
              <div className="col-sm-4">
                <label>Quốc gia</label>
                <div className="d-flex">
                  <select
                    className="form-control form-control-sm"
                    name="country"
                    onChange={this.handleInputChange}
                    value={this.state.country}
                  >
                    <option value="-1">Chọn quốc gia</option>
                    {elCountries}
                  </select>
                  {/* <span className="text-danger">&nbsp;(*)</span> */}
                </div>
              </div>
              {/* Loại phim */}
              <div className="col-sm-4">
                <label>Loại</label>
                <div className="d-flex">
                  <select
                    className="form-control form-control-sm"
                    name="type"
                    onChange={this.handleInputChange}
                    value={this.state.type}
                  >
                    <option value="-1">Chọn loại phim</option>
                    <option value="PhimLe">Phim lẻ</option>
                    <option value="PhimBo">Phim bộ</option>
                  </select>
                  {/* <span className="text-danger">&nbsp;(*)</span> */}
                </div>
              </div>
              {/* Thời lượng */}
              <div className="col-sm-4">
                <label>Thời lượng</label>
                <div className="d-flex">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Nhập thời lượng"
                    name="duration"
                    onChange={this.handleInputChange}
                    value={this.state.duration}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex my-1">
              {/* Năm sản xuất */}
              <div className="col-sm-2">
                <label>Năm sản xuất</label>
                <div className="d-flex">
                  <select
                    className="form-control form-control-sm"
                    name="year"
                    onChange={this.handleInputChange}
                    value={this.state.year}
                  >
                    <option value="-1">Chọn năm </option>
                    {elYears}
                  </select>
                </div>
              </div>
              {/* Ngày khởi chiếu */}
              <div className="col-sm-4">
                <label>Ngày khởi chiếu</label>
                <div className="d-flex">
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    placeholder="Ngày khởi chiếu"
                    name="openingDay"
                    onChange={this.handleInputChange}
                    value={this.state.openingDay}
                  />
                </div>
              </div>
              {/* Nhà sản xuất */}
              <div className="col-sm-6">
                <label>Đạo diễn</label>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nhập nhà sản xuất"
                    name="producers"
                    onChange={this.handleInputChange}
                    value={this.state.producers}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex my-1">
              {/* Trailer */}
              <div className="col-sm-6">
                <label>Trailer</label>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nhập link trailer youtube"
                    name="trailer"
                    onChange={this.handleInputChange}
                    value={this.state.trailer}
                  />
                </div>
              </div>
              {/* Poster */}
              <div className="col-sm-6">
                <label>Poster</label>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nhập link poster"
                    name="poster"
                    onChange={this.handleInputChange}
                    value={this.state.poster}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex">
              {/* Tóm tắt */}
              <div className="col-sm-12">
                <label>Nội dung</label>
                <div className="d-flex">
                  <textarea
                    className="form-control"
                    name="overview"
                    onChange={this.handleInputChange}
                    value={this.state.overview}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-12 my-3 text-center">
              <button className="btn btn-success mx-1" type="submit">
                Lưu
              </button>
              <Link to="/admin/movies">
                <button className="btn btn-danger mx-1">Trở về</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default AddForm;
