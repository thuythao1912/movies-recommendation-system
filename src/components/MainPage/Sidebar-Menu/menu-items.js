import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class MenuItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var items = [];
    var isDisplayed = "";
    items = this.props.data;
    var items = items.map((item, index) => {
      return (
        <div key={index} className="py-2">
          <NavLink
            to={`/field/${this.props.menuName}/${item._id}`}
            className="text-decoration-none text-dark "
            activeClassName="sidebar-item"
          >
            <span className="ml-2">{item.name}</span>
          </NavLink>
        </div>
      );
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
