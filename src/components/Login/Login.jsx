import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import auth from "../../utils/auth";
import { apiEndpoint } from "../../utils/urls";
import Spinner from "../Spinner/Spinner";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.action";

class Login extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    role: "",
    isSuccess: "",
    isloading: false,
  };
  componentDidMount() {
    if (localStorage.getItem("LoginData")) {
      const state = JSON.parse(localStorage.getItem("LoginData"));
      this.verifyToken(state);
    }
  }
  verifyToken = (state) => {
    const url = `${apiEndpoint}/users/auth`;
    axios
      .post(url, {}, { headers: { Authorization: state.token } })
      .then((res) => {
        console.log("AUTHORIZED");
        this.props.setCurrentUser({ ...state });
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  setLocalStorage = () => {
    const { email, token, role } = this.props.currentUser;

    localStorage.setItem("LoginData", JSON.stringify({ email, token, role }));
    this.props.history.push("/");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  validateForm = () => {
    return this.state.email.length > 4 && this.state.password.length > 4;
  };
  handleClick = (e) => {
    this.setState({ isloading: true });
    const url = `${apiEndpoint}/users/login`;
    const login = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(url, login)
      .then((res) => {
        this.props.setCurrentUser({
          token: res.data.token,
          role: res.data.user.role,
        });
        this.setState({
          isSuccess: true,
          isloading: false,
        });
        if (!this.state.isSuccess) {
          wrongLogin.display = "block";
        } else {
          wrongLogin.display = "none";
        }

        this.setLocalStorage();
      })
      .catch((error) => {
        this.setState({ isloading: false, isSuccess: false });
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <div className="body-login">
          <div className="container-login">
            <div className="header-login">
              <i className="fas fa-user-lock fa-lg"></i>
              <br />
              LOG IN
            </div>

            <div className="tbox-login">
              <i className="fas fa-user" />
              <input
                id="email"
                type="text"
                placeholder="email"
                style={inputArea}
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <div className="tbox-login">
              <i className="fas fa-lock" />
              <input
                id="password"
                type="password"
                placeholder="password"
                style={inputArea}
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>
            <button
              className="btn-login"
              type="submit"
              onClick={this.handleClick}
              disabled={!this.validateForm()}
            >
              Login
            </button>

            <div
              className={
                this.state.isSuccess === false
                  ? "wrong-login-visible"
                  : "wrong-login-hidden"
              }
            >
              Invalid email or password
            </div>
            <Link className="l1-login" to="/forgot-password">
              FORGOT PASSWORD
            </Link>

            {/* <Link className="l2-login" to="/create-account">
              CREATE AN ACCOUNT
            </Link> */}
            {this.state.isloading ? <Spinner /> : null}
          </div>
        </div>
      </div>
    );
  }
}

const inputArea = {
  background: "none",
  border: "none",
  outline: "none",
  textAlign: "center",
  margin: "auto",
  fontFamily: "Poppins",
  width: "90%",
  lineHeight: "37px",
  fontSize: "14px",
  color: "#333",
};
const wrongLogin = {
  display: "block",
  width: "260px",
  padding: "5px 0",
  color: "red",
  textAlign: "center",
  margin: "0px auto",
  transition: "0.5s all",
};
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
