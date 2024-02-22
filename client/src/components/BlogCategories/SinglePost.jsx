import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useData } from "../Context/DataContext";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RandomPosts from "./RandomPosts";

export default function SinglePost() {
  const { id } = useParams();
  const { posts, loggedIn, userId, allUsers, editPost, setEditPost } =
    useData();
  const findPost = posts.filter((item) => item.id === parseInt(id));
  const findUser = findPost.filter((item) => item.user_id === parseInt(userId));
  const post_date = findPost.length !== 0 && findPost[0].date_time;
  const user_id = findPost.length !== 0 && findPost[0].user_id;
  const userInfo = allUsers.filter((item) => item.id === user_id);
  console.log(posts);

  return (
    <div className="single-post-container">
      <div className="single-post-box">
        <div className="post">
          <div className="first-img-div">
            <img
              className="first-img"
              src={findPost.length !== 0 && findPost[0].url}
            />
          </div>
          <div className="user-info">
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{ width: 56, height: 56 }}
                alt={`${
                  userInfo.length !== 0 && userInfo[0].username
                } profie image`}
                src={userInfo.length !== 0 && userInfo[0].user_img}
              />
            </Stack>
            <div className="user-text">
              <b>{userInfo.length !== 0 && userInfo[0].username}</b>
              <p>{post_date}</p>
            </div>
            <div className="user-edit">
              {loggedIn && findUser.length !== 0 && (
                <div className="edit">
                  <Link
                    className="post-btns"
                    onClick={() => {
                      setEditPost(findPost);
                    }}
                    to="/edit-post"
                  >
                    <BorderColorOutlinedIcon />
                  </Link>
                </div>
              )}
              {loggedIn && findUser.length !== 0 && (
                <div className="edit second">
                  <form
                    className="delete-post-form"
                    action="/api/delete-post"
                    method="post"
                  >
                    <input
                      type="hidden"
                      name="id"
                      value={findPost.length !== 0 && findPost[0].id}
                    />
                    <button className="post-btns" type="submit">
                      <DeleteOutlineOutlinedIcon />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
          <div className="post-text-area">
            <h1>{findPost.length !== 0 && findPost[0].title}</h1>
            <p>{findPost.length !== 0 && findPost[0].user_text}</p>
          </div>
        </div>
        <div className="suggestions">
          <h4>Other posts you may like</h4>
          {posts.map((item, i) => {
            const rndm = Math.floor(Math.random() * posts.length);
            if (i < 3 && posts[rndm].id !== parseInt(id)) {
              return <RandomPosts key={posts[rndm].id} {...posts[rndm]} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}
