import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import auth from "../../utils/auth";
const logout = () => {
  auth.logout(() => {
    localStorage.removeItem("LoginData");
    window.location.href = "/";
  });
};
const Header = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Writer.com
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/main">
            Manage
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Link
          </Link>
        </li>
      </ul>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link active" to="/create-account">
              Create Account
            </Link>
          </li>
          <li className="nav-item">
            {auth.isAuthenticated() ? (
              <Link className="nav-link active" onClick={logout}>
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
export default Header;
