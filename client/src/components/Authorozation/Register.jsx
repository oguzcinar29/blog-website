import React, { useState } from "react";
import { Link } from "react-router-dom";
// tomorrow add input file like in write component checkh the write component you'll find what i meant

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-container">
      <div className="auth-box">
        <form
          encType="multipart/form-data"
          action="https://blog-website-38s4.onrender.com/api/register"
          method="post"
        >
          <div className="box2">
            <div id="pp-area">
              <input
                style={{ display: "none" }}
                id="file-input"
                type="file"
                name="file2"
              />
              <label id="image-label" htmlFor="file-input">
                Upload Profile Picture
              </label>
            </div>
            <div className="box">
              <label>username:</label>
              <input
                type="text"
                placeholder="Type username..."
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="box">
              <label>email:</label>
              <input
                type="text"
                placeholder="Type email..."
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="box">
              <label>password:</label>
              <input
                type="password"
                placeholder="Type password..."
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input className="login-btn" type="submit" value="Register" />
            <div className="register-btn">
              <b>Do you have an account ?</b>
              <Link style={{ paddingLeft: "5px" }} to="/login">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
