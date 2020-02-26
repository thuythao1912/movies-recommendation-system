import React, { Component } from "react";
class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var items = [];
    var isDisplayed = "";
    items = this.props.data;
    var items = items.map((item, index) => {
      return <div key={index}>{item.name}</div>;
    });
    if (!this.props.isDisplayed) {
      isDisplayed = "none";
    }
    return (
      <div id={this.props.menuName} style={{ display: `${isDisplayed}` }}>
        {items}
      </div>
    );
  }
}
export default MenuItem;
