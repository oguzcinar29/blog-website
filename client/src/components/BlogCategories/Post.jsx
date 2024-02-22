import React from "react";
import { Link } from "react-router-dom";
export default function Post({ id, url, title, user_text }) {
  console.log(user_text);
  console.log(url);
  return (
    <>
      {id % 2 === 1 && (
        <div className="box">
          <div className="left">
            <img src={`https://blog-website-38s4.onrender.com/${url}`} />
          </div>
          <div className="right">
            <h1>{title}</h1>
            <p>{user_text !== null && user_text.slice(0, 300) + "..."}</p>
            <Link onClick={() => window.scrollTo(0, 0)} to={`/${id}`}>
              Read More
            </Link>
          </div>
        </div>
      )}
      {id % 2 === 0 && (
        <div className="box">
          <div className="right">
            <h1>{title}</h1>
            <p>{user_text !== null && user_text.slice(0, 300) + "..."}</p>
            <Link to={`/${id}`}>Read More</Link>
          </div>
          <div className="left">
            <img src={url} />
          </div>
        </div>
      )}
    </>
  );
}
