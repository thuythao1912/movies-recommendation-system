import React from "react";
import Admin from "../components/Admin";
import MainPage from "../components/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/" component={MainPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
