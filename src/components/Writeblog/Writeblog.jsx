import React, { Component } from "react";
import auth from "../../utils/auth";
import Header from "../Header/Header";
import axios from "axios";
import { apiEndpoint } from "../../utils/urls";

class Writeblog extends Component {
  state = { title: "", body: "" };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  componentDidMount() {
    if (localStorage.getItem("LoginData")) {
      const state = JSON.parse(localStorage.getItem("LoginData"));
      this.setState({ ...state });
    }
  }
  handleClick = () => {
    console.log({ Authorization: this.state.token });
    if (auth.isAuthenticated()) {
      this.uploadBlog();
    }
  };
  uploadBlog = () => {
    const url = `${apiEndpoint}/blogs/push`;
    axios
      .post(url, this.state, { headers: { Authorization: this.state.token } })
      .then((res) => {
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
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-5">Let your thoughts flow</h1>
            <p className="lead">
              <div className="form-group">
                <label for="usr">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label for="comment">Content:</label>
                <textarea
                  placeholder="Write Here...."
                  className="form-control"
                  rows="9"
                  id="body"
                  onChange={this.handleChange}
                ></textarea>
              </div>
            </p>
            <button className="btn btn-primary" onClick={this.handleClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Writeblog;
