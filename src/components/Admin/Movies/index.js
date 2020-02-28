import React, { Component } from "react";
import AddForm from "./Add-Form";
import List from "./List";
import { Route, Link } from "react-router-dom";
class Movies extends Component {
  render() {
    return (
      <div className="">
        <Route path="/admin/movies/add" component={AddForm} />
        <Route exact path="/admin/movies" component={List} />
      </div>
    );
  }
}
export default Movies;
