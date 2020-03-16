import React, { Component } from "react";
import MenuItem from "./menu-items";
import { NavLink } from "react-router-dom";
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
    callApi("countries", "get", null)
      .then(res => {
        this.setState({ countries: res.data });
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
      <div className="bg-white sidebar-menu">
        <div>
          <div
            onClick={() => this.showHide("genres")}
            className="sidebar-menu-title p-1 text-center"
          >
            Thể loại
          </div>
          <MenuItem
            data={this.state.genres}
            menuName="genres"
            isDisplayed={this.state.isDisplayedGenres}
          />
        </div>
        <div>
          <div
            onClick={() => this.showHide("countries")}
            className="sidebar-menu-title p-1 text-center"
          >
            Quốc gia
          </div>
          <MenuItem
            data={this.state.countries}
            menuName="country"
            isDisplayed={this.state.isDisplayedCountries}
          />
        </div>
        {/* <div>
          <div className="sidebar-menu-title p-1 text-center">
            <NavLink
              to={`/field/type/PhimBo`}
              className="text-decoration-none text-dark "
              activeClassName="bg-info"
            >
              Phim bộ
            </NavLink>
          </div>
        </div>
        <div>
          <div className="sidebar-menu-title p-1 text-center">Phim lẻ</div>
        </div> */}
      </div>
    );
  }
}
export default SidebarMenu;
