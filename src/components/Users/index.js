import React, { Component } from "react";
import Header from "../MainPage/Header";
export default class UsersMainPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <div className="d-flex" style={{ marginTop: "62px" }}>
          {this.props.match.params.id}
        </div>
      </div>
    );
  }
}
