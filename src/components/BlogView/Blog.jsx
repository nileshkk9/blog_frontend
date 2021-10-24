import React from "react";
import "./Blog.css";
import { Link } from "react-router-dom";

const handleClick = () => {
    // when approved change the status of published to true
}
const Blog = (props) => {
  return (
    <div>
      <div className="blog-tile">
        <h4>{props.data.title}</h4>
        <p>
          {props.data.body.slice(0, 100)}...<Link>Read More</Link>
        </p>
        <button className="aprv-btn" onClick={handleClick}>Approve</button>
      </div>
    </div>
  );
};
export default Blog;
