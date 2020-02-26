import React, { Component } from "react";
import callApi from "../../../utils/apiCaller";
class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    callApi("users", "get", null)
      .then(res => {
        //console.log(res.data);
        this.setState({ items: res.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    var items = this.state.items;
    if (items.length > 0) {
      var elItem = items.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.gender}</td>
          </tr>
        );
      });
    }
    return (
      <div className="col-sm-10">
        <table className="table table-sm" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{elItem}</tbody>
        </table>
      </div>
    );
  }
}
export default Accounts;
