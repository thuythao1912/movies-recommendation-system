import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import SidebarMenu from "./Sidebar-Menu";
import MovieDetails from "./MovieDetails";
import HomePage from "./HomePage";
class MainPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="d-flex">
          <SidebarMenu />
          <div className="col-sm-11 p-0">
            <Route exact path="/" component={HomePage} />
            <Route path="/movie-details/:id" component={MovieDetails} />
          </div>
        </div>
      </div>
    );
  }
}
export default MainPage;
