import React, { Component } from "react";
import axios from "axios";
import "./Main.css";
import Blog from "../BlogView/Blog";
import { apiEndpoint } from "../../utils/urls";
import Header from "../Header/Header";
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
  handleClick = (blogid) => {
    // when approved change the status of published to true

    const url = `${apiEndpoint}/blogs/approve`;
    axios
      .post(url, { blogid }, { headers: { Authorization: this.state.token } })
      .then((res) => {
        this.setState({
          blogs: this.state.blogs.filter((blog) => blog._id !== blogid),
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <Header />
        {this.state.blogs.length > 0 ? (
          <div className="blog-grid">
            {this.state.blogs.map((blog) => (
              <Blog
                data={blog}
                key={blog._id}
                approveClick={this.handleClick}
              />
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
