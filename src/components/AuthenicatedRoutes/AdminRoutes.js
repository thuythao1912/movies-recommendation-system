import React from "react";
import { Route, Redirect } from "react-router-dom";
let isLoggedAdmin = localStorage.getItem("admin");
console.log(isLoggedAdmin);
const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedAdmin !== null ? (
        <Component {...props} />
      ) : (
        <Redirect to="/admin/signin" />
      )
    }
  />
);
export default AdminRoute;
