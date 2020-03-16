import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export default class SearchButton extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { searchString: "" };
    this.onChangeSearchString = this.onChangeSearchString.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  onChangeSearchString(e) {
    this.setState({ searchString: e.target.value });
  }
  onKeyPress(e) {
    if (e.key === "Enter") {
      this.onSubmit();
    }
  }
  async onSubmit() {
    // e.preventDefault();
    if (this.state.searchString == "") {
      this.setState({ searchString: "null" });
    }
    window.location.href = await `/search/${this.state.searchString}`;
  }
  render() {
    return (
      <div className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-1 form-control-sm "
          type="search"
          placeholder="Tìm kiếm"
          value={this.state.searchString}
          onChange={this.onChangeSearchString}
          onKeyPress={this.onKeyPress}
          required
        />
        <button
          className="btn btn-outline-danger my-2 my-sm-0 btn-sm"
          type="button"
          onClick={this.onSubmit}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    );
  }
}
