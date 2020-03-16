import React, { Component } from "react";
import SidebarMenu from "./Sidebar-Menu";
import Users from "./Users";
import Items from "./Items";
import { Route } from "react-router-dom";
import Movies from "./Movies";
class Admin extends Component {
  render() {
    return (
      <div>
        {/* <Header /> */}
        <div className="d-flex">
          <div className="col-sm-2 p-0">
            <SidebarMenu className="" />
          </div>
          <div className="col-sm-10 bg-white">
            <Route path="/admin/users" component={Users} />
            <Route path="/admin/items" component={Items} />
            <Route path="/admin/movies" component={Movies} />
          </div>
        </div>
      </div>
    );
  }
}
export default Admin;
