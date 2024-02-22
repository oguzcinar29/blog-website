import React, { createRef, useState } from "react";
import { useData } from "../Context/DataContext";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function Write() {
  const fileInput = createRef();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const { userId, username } = useData();

  return (
    <div className="write-container">
      <div className="write-box">
        <form
          enctype="multipart/form-data"
          className="write-form"
          action="https://blog-website-38s4.onrender.com/api/get-user-post"
          method="post"
        >
          <div className="left">
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
                  name="file"
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
                    defaultValue="female"
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
