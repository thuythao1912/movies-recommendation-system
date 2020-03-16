import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import SidebarMenu from "./Sidebar-Menu";
import MovieDetails from "./MovieDetails";
import HomePage from "./HomePage";
import SearchMovie from "./SearchMovies";
import MoviesByField from "./MoviesByFields";
class MainPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="d-flex" style={{ marginTop: "62px" }}>
          <div className="" style={{ width: "10%" }}>
            <SidebarMenu />
          </div>
          <div className="p-2" style={{ width: "90%" }}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/movie-details/:id" component={MovieDetails} />
            <Route path="/search/:movie" component={SearchMovie} />
            <Route path="/field/:field/:value" component={MoviesByField} />
          </div>
        </div>
      </div>
    );
  }
}
export default MainPage;
