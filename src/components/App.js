import React from "react";
import Admin from "../components/Admin";
import MainPage from "../components/MainPage";
import SignUp from "../components/SignUp";
import SignIn from "./SignIn/index";
import UsersMainPage from "./Users";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/admin" component={Admin} />
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
