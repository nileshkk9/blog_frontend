import React from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import auth from "../../utils/auth";
import { connect } from "react-redux";
const logout = () => {
  auth.logout(() => {
    localStorage.removeItem("LoginData");
    window.location.href = "/";
  });
};
const Header = (props) => {
  const path = useLocation().pathname;
  const isAdmin = props.currentUser.role === "ADMIN";
  const isWriter = props.currentUser.role === "CONTENT-WRITER";

  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Writer.com
          </Link>
        </li>
        {isAdmin ? (
          <li className="nav-item">
            <Link
              className={`nav-link ${path === "/main" ? "active" : ""}`}
              to="/main"
            >
              Manage
            </Link>
          </li>
        ) : null}
        {isWriter ? (
          <li className="nav-item">
            <Link
              className={`nav-link ${path === "/write-blog" ? "active" : ""}`}
              to="/write-blog"
            >
              NewBlog
            </Link>
          </li>
        ) : null}
      </ul>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {isWriter || isAdmin ? null : (
              <Link className="nav-link active" to="/create-account">
                Create Account
              </Link>
            )}
          </li>
          <li className="nav-item">
            {isWriter || isAdmin ? (
              <strong className="nav-link active text-warning">
                {props.currentUser.role}
              </strong>
            ) : null}
          </li>

          <li className="nav-item">
            {isWriter || isAdmin ? (
              <Link className="nav-link active" onClick={logout} to="/">
                Logout
              </Link>
            ) : (
              <Link className="nav-link active" to="/login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(Header);
