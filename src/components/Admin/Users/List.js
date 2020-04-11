import React, { Component } from "react";
import callApi from "../../../utils/apiCaller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../Pagination";
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isShowModal: false,
      itemSelected: null,
      limit: 10,
      currentPage: 1,
    };
    this.getData = this.getData.bind(this);
    this.handleSelectedPage = this.handleSelectedPage.bind(this);
  }
  componentDidMount() {
    this.getData();
  }

  deleteUser(user, name) {
    console.log(user);
    if (window.confirm(`Bạn muốn xóa người dùng: ${name}?`)) {
      //check if ratings are existing
      callApi(`rating?user=${user}`, "get", null)
        .then((res) => {
          if (res.data.length > 0) {
            if (
              window.confirm(
                `Xóa người dùng sẽ xóa dữ liệu đánh giá phim. Tiếp tục?`
              )
            ) {
              //delete user rating
              callApi(`rating/byobject?user${user}`, "delete", null).then();
              //delete user
              callApi(`users/${user}`, "delete", null).then();
              alert("Đã xóa người dùng thành công!");
              this.getData();
            }
          } else {
            //delete user
            callApi(`users/${user}`, "delete", null).then();
            alert("Đã xóa người dùng thành công!");
            this.getData();
          }
        })
        .catch((err) => console.log(err));
    }
  }
  getData() {
    callApi(
      `users?page=${this.state.currentPage}&limit=${this.state.limit}`,
      "get",
      null
    )
      .then((res) => {
        this.setState({ items: res.data });
        console.log(this.state.items);
      })
      .catch((err) => console.log(err));
  }
  handleSelectedPage(page) {
    this.setState({ currentPage: page });
    this.getData();
  }
  render() {
    let items = this.state.items;
    //create rows
    let elItems = items.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1 + (this.state.currentPage - 1) * this.state.limit}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>
            {/* <Link to={`/admin/users/edit/${item._id}`}>
              <FontAwesomeIcon icon={faEdit} className="text-info" />
            </Link> */}
            <button
              className="btn btn-link"
              onClick={() => this.deleteUser(item._id, item.username)}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="text-info" />
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div className="p-2">
        <h3 className="text-center">DANH SÁCH NGƯỜI DÙNG</h3>
        {/* <Link to="/admin/movies/add" className="text-decoration-none ">
            <button className="btn btn-info btn-sm">Thêm mới</button>
          </Link> */}
        <div className="bg-white">
          <table className="table table-sm my-2 table-striped table-bordered">
            <thead>
              <tr>
                <th width="10%">STT</th>
                <th width="30%">Tên người dùng</th>
                <th width="40%">Email</th>
                <th width="20%">Thao tác</th>
              </tr>
            </thead>
            <tbody>{elItems}</tbody>
          </table>
        </div>
        <Pagination
          collection="users"
          limit={this.state.limit}
          handleSelectedPage={this.handleSelectedPage}
        />
      </div>
    );
  }
}
export default List;
