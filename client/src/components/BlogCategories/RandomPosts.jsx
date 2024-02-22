import React from "react";
import { Link } from "react-router-dom";

export default function RandomPosts({ url, title, id }) {
  return (
    <div className="random-post">
      <img src={`https://blog-website-38s4.onrender.com/${url}`} />
      <h4>{title}</h4>
      <Link
        onClick={window.scrollTo(0, 0)}
        className="random-btn"
        to={`/${id}`}
      >
        Read More
      </Link>
    </div>
  );
}
