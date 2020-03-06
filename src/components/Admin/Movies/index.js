import React, { Component } from "react";
import AddForm from "./Add-Form";
import List from "./List";
import EditForm from "./Edit-Form";
import { Route, Link } from "react-router-dom";
class Movies extends Component {
  render() {
    return (
      <div className="">
        <Route exact path="/admin/movies/add" component={AddForm} />
        <Route exact path="/admin/movies" component={List} />
        <Route path="/admin/movies/edit/:id" component={EditForm} />
      </div>
    );
  }
}
export default Movies;
