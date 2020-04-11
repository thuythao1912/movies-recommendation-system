import React, { Component } from "react";
import SidebarMenu from "./Sidebar-Menu";
import Users from "./Users";
import Items from "./Items";
import { Route } from "react-router-dom";
import Movies from "./Movies";
import Rating from "./Rating";
import AdminRoute from "../AuthenicatedRoutes/AdminRoutes";
class Admin extends Component {
  render() {
    return (
      <div>
        <div className="d-flex">
          <div
            className="col-lg-2 col-sm-4 col-md-3 p-0"
            style={{ height: "100vh" }}
          >
            <SidebarMenu className="" />
          </div>
          <div className="col-sm-10 bg-white">
            <AdminRoute path="/admin/users" component={Users} />
            <AdminRoute path="/admin/items" component={Items} />
            <AdminRoute path="/admin/movies" component={Movies} />
            <AdminRoute path="/admin/rating" component={Rating} />
          </div>
        </div>
      </div>
    );
  }
}
export default Admin;
