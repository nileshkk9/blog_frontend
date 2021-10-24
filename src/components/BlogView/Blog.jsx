import React from "react";
import "./Blog.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiEndpoint } from "../../utils/urls";
import Dashboard from "../Dashboard/Dashboard";

const Blog = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title"></h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.data.title}</h6>
        <p className="card-text">{props.data.body.slice(0, 50)}...</p>
      </div>
      {props.dashboard ? (
        <React.Fragment>
          <button className="btn btn-link">Read More</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <button className="btn btn-danger mb-1">Delete</button>
          <button
            className="btn btn-primary"
            onClick={() => props.approveClick(props.data._id)}
          >
            Approve
          </button>
        </React.Fragment>
      )}
    </div>
  );
};
export default Blog;
