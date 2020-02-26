import React, { Component } from "react";
import Header from "./Panel";
import Users from "./Users";
import Items from "./Items";
import { Route } from "react-router-dom";
import Navigation from "./Navigation";
class Admin extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="d-flex">
          <Header className="" />
          <Route path="/admin/users" component={Users} />
          <Route path="/admin/items" component={Items} />
        </div>
      </div>
    );
  }
}
export default Admin;
