import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Authorozation/Login";
import Register from "./Authorozation/Register";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Art from "./Links/Art";
import Techonology from "./Links/Techonology";
import Science from "./Links/Science";
import Food from "./Links/Food";
import Design from "./Links/Design";
import Cinema from "./Links/Cinema";
import Write from "./Write/Write";
import { useData } from "./Context/DataContext";
import SinglePost from "./BlogCategories/SinglePost";
import EditPost from "./Write/EditPost";
import Footer from "./Footer/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import BlogCategories from "./BlogCategories/BlogCategories";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:id",
        element: <SinglePost />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/art",
        element: <Art />,
      },
      {
        path: "/science",
        element: <Science />,
      },
      {
        path: "/technology",
        element: <Techonology />,
      },
      {
        path: "/cinema",
        element: <Cinema />,
      },
      {
        path: "/design",
        element: <Design />,
      },
      {
        path: "/food",
        element: <Food />,
      },
      {
        path: "/edit-post",
        element: <EditPost />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="big-container">
      <div className="big-box">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </div>
  );
}

export default App;
