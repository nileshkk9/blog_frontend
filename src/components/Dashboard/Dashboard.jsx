import React, { Component } from "react";
import Header from "../Header/Header";
import Blog from "../BlogView/Blog";
import axios from "axios";
import auth from "../../utils/auth";
import { apiEndpoint } from "../../utils/urls";
import { connect } from "react-redux";
import { setBlogs } from "../../redux/blog/blog.action";
import { setCurrentUser } from "../../redux/user/user.action";
class Dashboard extends Component {
  componentDidMount() {
    if (localStorage.getItem("LoginData")) {
      const state = JSON.parse(localStorage.getItem("LoginData"));
      this.verifyToken(state);
    }
    this.fetchBlogs();
  }
  verifyToken = (state) => {
    const url = `${apiEndpoint}/users/auth`;
    axios
      .post(url, {}, { headers: { Authorization: state.token } })
      .then((res) => {
        console.log("AUTHORIZED");
        this.props.setCurrentUser({ ...state });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  fetchBlogs = () => {
    const url = `${apiEndpoint}/blogs/showactiveposts`;
    axios
      .get(url)
      .then((res) => {
        this.props.setBlogs(res.data);
      })
      .catch((err) => {});
  };
  render() {
    const blogs = this.props.blogs;
    return (
      <div>
        <Header />
        {blogs.length > 0 ? (
          <div className="blog-grid">
            {blogs.map((blog) => (
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
const mapDispatchToProps = (dispatch) => ({
  setBlogs: (blog) => dispatch(setBlogs(blog)),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

const mapStateToProps = (state) => ({
  blogs: state.blog.blogs,
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
