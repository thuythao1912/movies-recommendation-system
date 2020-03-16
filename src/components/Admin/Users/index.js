import React, { Component } from "react";
import { Route } from "react-router-dom";
import AddForm from "./Add-Form";
import List from "./List";
import EditForm from "./Edit-Form";
class Users extends Component {
  render() {
    return (
      <div className="">
        <Route exact path="/admin/users/add" component={AddForm} />
        <Route exact path="/admin/users" component={List} />
        <Route path="/admin/users/edit/:id" component={EditForm} />
      </div>
    );
  }
}
export default Users;
