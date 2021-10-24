import React, { Component } from "react";
import axios from "axios";
import { apiEndpoint } from "../../utils/urls";
import Spinner from "../Spinner/Spinner";

class CreateAccount extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    isSuccess: "",
    loginMessage: "",
    isloading: false,
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
    const url = `${apiEndpoint}/users/createuser`;
    const login = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(url, login)
      .then((res) => {
        this.setState({
          isSuccess: true,
          isloading: false,
          loginMessage: res.data.message,
        });
        if (!this.state.isSuccess) {
          wrongLogin.display = "block";
        } else {
          wrongLogin.display = "none";
        }
      })
      .catch((error) => {
        this.setState({ isloading: false });
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <div className="body-login">
          <div className="container-login">
            <div className="header-login">
              <i className="fas fa-address-card fa-lg"></i>
              <br />
              Create Account
            </div>
            <div className="tbox-login">
              <i className="fas fa-fingerprint"></i>
              <input
                id="name"
                type="text"
                placeholder="name"
                style={inputArea}
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>

            <div className="tbox-login">
              <i className="fas fa-envelope" />
              <input
                id="email"
                type="text"
                placeholder="Email"
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
                placeholder="Password"
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
              Create Account
            </button>
            <span>{this.state.loginMessage}</span>
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
export default CreateAccount;
