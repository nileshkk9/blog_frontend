import React, { Component } from "react";
import axios from "axios";
import "./Main.css";
import Blog from "../BlogView/Blog";
import { apiEndpoint } from "../../utils/urls";
class Main extends Component {
  state = {
    blogs: [],
  };
  componentDidMount() {
    if (localStorage.getItem("LoginData")) {
      const state = JSON.parse(localStorage.getItem("LoginData"));
      this.setState({ ...state }, () => {
        this.fetchBlogs();
      });
    }
  }
  logout = () => {
    localStorage.removeItem("LoginData");
    window.location.href = "/";
  };

  fetchBlogs = () => {
    const url = `${apiEndpoint}/blogs/showall`;
    console.log(this.state);
    axios
      .get(url, { headers: { Authorization: this.state.token } })
      .then((res) => {
        console.log(res.data);
        this.setState({ blogs: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <div className="header">
          <span >{this.state.role}</span>
          <button onClick={this.logout} className="logout-btn">
            Logout
          </button>
        </div>

        {this.state.blogs.length > 0 ? (
          <div className="blog-grid">
            {this.state.blogs.map((blog) => (
              <Blog data={blog} key={blog._id} />
            ))}
          </div>
        ) : (
          <span>No Blogs Found</span>
        )}
      </div>
    );
  }
}

export default Main;
