import React from "react";
import { useData } from "../Context/DataContext";
import Post from "./Post";

export default function BlogCategories(props) {
  const { posts } = useData();

  return (
    <div className="posts-container">
      <div className="posts-box">
        {posts.map((item, i) => {
          console.log(props.value);
          if (props.value === item.category) {
            return <Post key={i} {...item} />;
          }
          if (props.value === "all") {
            return <Post key={i} {...item} />;
          }
        })}
      </div>
    </div>
  );
}
