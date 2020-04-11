import React from "react";
import Admin from "../components/Admin";
import MainPage from "../components/MainPage";
import SignUp from "../components/SignUp";
import SignIn from "./SignIn";
import UsersMainPage from "./Users";
import SignInAdmin from "./Admin/SignIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AdminRoutes from "./AuthenicatedRoutes/AdminRoutes";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/admin/signin" component={SignInAdmin} />
          <AdminRoutes path="/admin" component={Admin} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/users/:id" component={UsersMainPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
