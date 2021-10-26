import React, { Component } from "react";
import axios from "axios";
import "./Main.css";
import Blog from "../BlogView/Blog";
import { apiEndpoint } from "../../utils/urls";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.action";
class Main extends Component {
  state = {
    blogs: [],
  };
  componentDidMount() {
    if (localStorage.getItem("LoginData")) {
      const state = JSON.parse(localStorage.getItem("LoginData"));
      this.verifyToken(state);
      // this.setState({ ...state }, () => {});
    }
  }

  verifyToken = (state) => {
    console.log("STATE", state);
    const url = `${apiEndpoint}/users/auth`;
    axios
      .post(url, {}, { headers: { Authorization: state.token } })
      .then((res) => {
        console.log("AUTHORIZED");
        this.props.setCurrentUser({ ...state });
        this.fetchBlogs();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleClick = (blogid, cmd) => {
    // when approved change the status of published to true

    const url = `${apiEndpoint}/blogs/${cmd}`;
    axios
      .post(
        url,
        { blogid },
        { headers: { Authorization: this.props.currentUser.token } }
      )
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
    console.log("FECTHING:", this.props.currentUser);
    axios
      .get(url, { headers: { Authorization: this.props.currentUser.token } })
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
                deleteBlog={this.handleClick}
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
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
