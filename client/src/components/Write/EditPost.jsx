import React, { createRef, useState } from "react";
import { useData } from "../Context/DataContext";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
export default function EditPost() {
  const { userId, username, editPost } = useData();
  console.log(editPost);
  const [title, setTitle] = useState(editPost[0].title);
  const [text, setText] = useState(editPost[0].user_text);
  console.log(editPost[0].date_time);
  return (
    <div className="write-container">
      <div className="write-box">
        <form
          encType="multipart/form-data"
          className="write-form"
          action="https://blog-website-38s4.onrender.com/api/edit-post"
          method="post"
        >
          <div className="left">
            <input type="hidden" name="post_id" value={editPost[0].id} />
            <input type="hidden" name="date" value={editPost[0].date_time} />
            <input type="hidden" name="url2" value={editPost[0].url} />
            <input
              className="first-input"
              type="text"
              name="title"
              value={title}
              placeholder="Type title..."
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="second-input"
              type="text"
              placeholder="Type text..."
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="right">
            <div className="box first-box">
              <div className="image-down">
                <h3>Publish</h3>
                <p>
                  <b>Status: </b>Draft
                </p>
                <p>
                  <b>Visibilty: </b>Public
                </p>
                <input type="hidden" name="user_id" value={userId} />

                <input
                  style={{ display: "none" }}
                  id="file-input"
                  type="file"
                  name="file3"
                />
                <label id="image-label" htmlFor="file-input">
                  Upload Image
                </label>
              </div>
              <div className="update">
                <input type="submit" value="Update" />
              </div>
            </div>
            <div className="box">
              <h3>Category</h3>
              <div className="category">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={editPost[0].category}
                    name="radioButtonsGroup"
                  >
                    <FormControlLabel
                      value="art"
                      control={<Radio />}
                      label="Art"
                    />
                    <FormControlLabel
                      value="science"
                      control={<Radio />}
                      label="Science"
                    />
                    <FormControlLabel
                      value="technology"
                      control={<Radio />}
                      label="Technology"
                    />
                    <FormControlLabel
                      value="cinema"
                      control={<Radio />}
                      label="Cinema"
                    />
                    <FormControlLabel
                      value="design"
                      control={<Radio />}
                      label="Design"
                    />
                    <FormControlLabel
                      value="food"
                      control={<Radio />}
                      label="Food"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
