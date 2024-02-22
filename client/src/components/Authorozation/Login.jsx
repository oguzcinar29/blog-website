import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useData } from "../Context/DataContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggFail, isPassFail } = useData();
  return (
    <div className="auth-container">
      <div className="auth-box">
        <form
          action="https://blog-website-38s4.onrender.com/api/login"
          method="post"
        >
          <h4>Login</h4>
          {isLoggFail && (
            <h5 style={{ color: "red" }}>The email is not found</h5>
          )}
          {isPassFail && <h5 style={{ color: "red" }}>Wrong password</h5>}
          <div className="box2">
            <div className="box">
              <label>email:</label>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="box">
              <label>password:</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input className="login-btn" type="submit" value="Login" />
            <div className="register-btn">
              <b>Do'nt you have an account ?</b>
              <Link style={{ paddingLeft: "5px" }} to="/register">
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
