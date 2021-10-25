import React, { Component } from "react";
import Header from "../Header/Header";
import Blog from "../BlogView/Blog";
import axios from "axios";
import auth from "../../utils/auth";
import { apiEndpoint } from "../../utils/urls";
class Dashboard extends Component {
  state = {
    blogs: [],
  };

  componentDidMount() {
    if (localStorage.getItem("LoginData")) {
      // auth.login(() => {});
      const state = JSON.parse(localStorage.getItem("LoginData"));

      this.setState({ ...state }, () => {
        console.log("STATE:", this.state);
        if (this.state.role === "CONTENT-WRITER") {
          auth.login(() => {});
        } else if (this.state.role === "ADMIN") {
          auth.loginAdmin();
        }
      });
    }
    this.fetchBlogs();
  }
  fetchBlogs = () => {
    const url = `${apiEndpoint}/blogs/showactiveposts`;
    console.log(this.state);
    axios
      .get(url)
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
              <Blog data={blog} key={blog._id} dashboard={true} />
            ))}
          </div>
        ) : (
          <span>No Blogs Found</span>
        )}
      </div>
    );
  }
}

export default Dashboard;
