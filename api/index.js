import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import multer from "multer";
import { fileURLToPath } from "url";

import { dirname } from "path";
import moment from "moment/moment.js";
import { log } from "console";
import dot from "dotenv";
import cors from "cors";
dot.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

const app = express();
const port = 5000;
const saltRounds = 10;
let loggedIn = false;
let user_info = { username: "", id: "" };
let isLoggFailed = false;
let isPassFailed = false;

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));
app.use(cors());
const POSTGRES_URL = process.env.POSTGRES_URL;

const db = new pg.Client({
  connectionString: POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect()
  .then(() => console.log("connected to database"))
  .catch((err) => console.error(err));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "TOPSECRETWORD",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/api/register", upload.single("file2"), async (req, res) => {
  const { username, email, password } = req.body;
  const url = req.file ? req.file.path : null;

  try {
    const result = await db.query("SELECT * FROM users");
    const data = result.rows;
    const findUser = data.find((item) => item.email === email);
    if (typeof findUser === "undefined") {
      try {
        bcrypt.hash(password, saltRounds, async (err, data) => {
          if (err) {
            console.log("Error hashing password: ", err);
          }
          const result2 = await db.query(
            "INSERT INTO users(username,email,password,user_img) VALUES ($1,$2,$3,$4)",
            [username, email, data, url]
          );
          res.redirect("https://blog-website-inky-tau.vercel.app/login");
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      res.send("The Account already created.Try to logging in");
    }
  } catch (err) {
    console.log("hey");
    console.log(err);
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email=($1)", [
      email,
    ]);
    const data = result.rows;
    if (data.length > 0) {
      const realPassword = data[0].password;
      bcrypt.compare(password, realPassword, (err, result) => {
        if (result) {
          loggedIn = true;
          isLoggFailed = false;
          user_info.id = data[0].id;
          user_info.username = data[0].username;
          res.redirect("https://blog-website-inky-tau.vercel.app");
          isPassFailed = false;
        } else {
          isPassFailed = true;
          isLoggFailed = false;
          res.redirect("https://blog-website-inky-tau.vercel.app/login");
        }
      });
    } else {
      isPassFailed = false;
      isLoggFailed = true;
      res.redirect("https://blog-website-inky-tau.vercel.app/login");
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/is-logg-true", (req, res) => {
  res.json({ isLoggFailed, isPassFailed });
});

app.post("/api/logged-out", (req, res) => {
  loggedIn = false;
  isPassFailed = false;
  isLoggFailed = false;
  res.redirect("https://blog-website-inky-tau.vercel.app");
});

// all data here
app.get("/api/all-data", async (req, res) => {
  res.json({ loggedIn, user_info });
});

app.get("/api/get-all-post", async (req, res) => {
  try {
    const post_result = await db.query("SELECT * FROM posts ORDER BY id DESC");
    const posts_data = post_result.rows;
    console.log(posts_data);
    res.json(posts_data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/get-user-info", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    const data = result.rows;
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

// all data here

// write form start

app.post("/api/get-user-post", upload.single("file"), async (req, res) => {
  const { title, text, user_id, radioButtonsGroup } = req.body;
  const url = req.file ? req.file.path : null;
  console.log(req.body);
  try {
    await db.query(
      "INSERT INTO posts(title,user_text,category,url,user_id,date_time) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        title,
        text,
        radioButtonsGroup,
        url,
        parseInt(user_id),
        moment().format("MM/DD/YYYY HH:mm:ss"),
      ]
    );
    res.redirect("https://blog-website-inky-tau.vercel.app");
  } catch (err) {
    console.log(err);
  }
});

// write form end

// edit post
app.post("/api/edit-post", upload.single("file3"), async (req, res) => {
  const { title, text, user_id, radioButtonsGroup, post_id, date, url2 } =
    req.body;
  const url = req.file ? req.file.path : url2;

  try {
    await db.query(
      "UPDATE posts SET title=($1),user_text=($2),category=($3),url=($4),user_id=($5),date_time=($6) WHERE id=($7)",
      [title, text, radioButtonsGroup, url, user_id, date, post_id]
    );
    res.redirect("https://blog-website-inky-tau.vercel.app");
  } catch (err) {
    console.log(err);
  }
});

// delete post
app.post("/api/delete-post", async (req, res) => {
  const id = parseInt(req.body.id);
  try {
    await db.query("DELETE FROM posts WHERE id=($1)", [id]);
  } catch (err) {
    log(err);
  }
  res.redirect("https://blog-website-inky-tau.vercel.app");
});

app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
