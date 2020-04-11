import React, { Component } from "react";
import callApi from "../../utils/apiCaller";
export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = { totalPage: 0, pagination: [], selectedPage: 1 };
    this.createPagination = this.createPagination.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.handleSelectedPage = this.handleSelectedPage.bind(this);
  }
  async componentDidMount() {
    await callApi(
      `pagination?collection=${this.props.collection}&limit=${this.props.limit}`,
      "get",
      null
    ).then((res) => {
      this.setState({ totalPage: res.data });
    });
    this.handleSelectedPage();
  }
  async getCurrentPage(page) {
    await this.setState({ selectedPage: page });
    this.handleSelectedPage();
  }
  handleSelectedPage() {
    this.props.handleSelectedPage(this.state.selectedPage);
  }
  createPagination(selectedPage) {
    let arr = [];
    let prev, next;
    if (selectedPage == 1) {
      prev = "disabled";
    }
    arr.push(
      <li className={`page-item ${prev}`} key="prev">
        <button
          className="page-link"
          tabIndex="-1"
          aria-disabled="true"
          onClick={() => this.getCurrentPage(selectedPage - 1)}
        >
          Trước
        </button>
      </li>
    );
    for (let i = 1; i <= this.state.totalPage; i++) {
      let active = "";
      if (i === this.state.selectedPage) {
        active = "active";
      }
      arr.push(
        <li className={`page-item ${active}`} key={i}>
          <button className="page-link" onClick={() => this.getCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    if (selectedPage == this.state.totalPage) {
      next = "disabled";
    }
    arr.push(
      <li className={`page-item ${next}`} key="next">
        <button
          className="page-link"
          tabIndex="-1"
          aria-disabled="true"
          onClick={() => this.getCurrentPage(selectedPage + 1)}
        >
          Sau
        </button>
      </li>
    );
    return arr;
  }
  render() {
    console.log("pagination render");
    let elPagination = this.createPagination(this.state.selectedPage);
    return (
      <nav aria-label="...">
        <ul className="pagination justify-content-center">{elPagination}</ul>
      </nav>
    );
  }
}
