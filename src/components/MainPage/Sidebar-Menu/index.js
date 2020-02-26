import React, { Component } from "react";
import MenuItem from "./menu-items";
import callApi from "../../../utils/apiCaller";
class SidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      countries: [],
      isDisplayedGenres: false,
      isDisplayedCountries: false
    };
    //define functions
    this.showHide = this.showHide.bind(this);
  }
  componentDidMount() {
    callApi("genres", "get", null)
      .then(res => {
        this.setState({ genres: res.data });
      })
      .catch(err => console.log(err));
  }
  //funtion show hide menu item
  showHide(name) {
    if (name == "genres") {
      this.setState({ isDisplayedGenres: !this.state.isDisplayedGenres });
    } else if (name == "countries") {
      this.setState({ isDisplayedCountries: !this.state.isDisplayedCountries });
    }
  }
  render() {
    return (
      <div className="bg-dark col-sm-1 text-white">
        <div>
          <div onClick={() => this.showHide("genres")}>Thể loại</div>
          <MenuItem
            data={this.state.genres}
            menuName="genres"
            isDisplayed={this.state.isDisplayedGenres}
          />
        </div>
        <div>
          <div onClick={() => this.showHide("countries")}>Quốc gia</div>
          <MenuItem
            data={this.state.countries}
            menuName="countries"
            isDisplayed={this.state.isDisplayedCountries}
          />
        </div>
        <div>
          <div>Phim bộ</div>
        </div>
        <div>
          <div>Phim lẻ</div>
        </div>
      </div>
    );
  }
}
export default SidebarMenu;
