import React from "react";
import { useData } from "../Context/DataContext";
import BlogCategories from "../BlogCategories/BlogCategories";
function Home() {
  return (
    <div className="home-container">
      <div className="home-container">
        <BlogCategories value="all" />
      </div>
    </div>
  );
}

export default Home;
