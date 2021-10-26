import React, { Component } from "react";
import auth from "../../utils/auth";
import Header from "../Header/Header";
import axios from "axios";
import { apiEndpoint } from "../../utils/urls";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.action";
class Writeblog extends Component {
  state = { title: "", body: "" };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  // componentDidMount() {
  //   if (localStorage.getItem("LoginData")) {
  //     const state = JSON.parse(localStorage.getItem("LoginData"));
  //     this.props.setCurrentUser({ ...state });
  //   }
  // }
  handleClick = () => {
    console.log({ Authorization: this.props.currentUser.token });
    this.uploadBlog();
  };

  uploadBlog = () => {
    const url = `${apiEndpoint}/blogs/push`;
    axios
      .post(url, this.state, {
        headers: { Authorization: this.props.currentUser.token },
      })
      .then((res) => {
        alert("Successfully Uploaded for Review");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <Header />
        <div className="jumbotron jumbotron-fluid" style={{ height: "100vh" }}>
          <div className="container">
            <h1 className="display-5">Let your thoughts flow</h1>
            <div className="lead">
              <div className="form-group">
                <label for="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label for="body">Content:</label>
                <textarea
                  placeholder="Write Here...."
                  className="form-control"
                  rows="9"
                  id="body"
                  onChange={this.handleChange}
                ></textarea>
              </div>
            </div>
            <button className="btn btn-primary" onClick={this.handleClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(Writeblog);
