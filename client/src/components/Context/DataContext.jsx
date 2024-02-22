import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context object
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const [whichLinkClicked, setWhichLinkClicked] = useState("");
  const [posts, setPosts] = useState([{}]);

  const [allUsers, setAllUsers] = useState([{}]);

  const [editPost, setEditPost] = useState([{}]);

  const [isLoggInClicked, setIsLoggIn] = useState(false);

  const [isLoggFail, setIsLoggFail] = useState(false);
  const [isPassFail, setIsPassFail] = useState(false);
  useEffect(() => {
    fetch("/api/all-data")
      .then((response) => response.json())
      .then((data) => {
        setLoggedIn(data.loggedIn);
        setUsername(data.user_info.username);
        setUserId(data.user_info.id);
      });
    fetch("/api/get-all-post")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
    fetch("/api/get-user-info")
      .then((response) => response.json())
      .then((data) => {
        setAllUsers(data);
      });
    fetch("/api/is-logg-true")
      .then((response) => response.json())
      .then((data) => {
        setIsLoggFail(data.isLoggFailed);
        setIsPassFail(data.isPassFailed);
      });
    window.localStorage.setItem("user", JSON.stringify(loggedIn));
  }, [loggedIn]);

  const AllContext = {
    loggedIn,
    username,
    isLoggInClicked,
    setIsLoggIn,
    userId,
    editPost,
    isPassFail,
    isLoggFail,
    setEditPost,
    whichLinkClicked,
    setWhichLinkClicked,
    posts,
    setPosts,
    allUsers,
    setAllUsers,
  };

  return (
    <DataContext.Provider value={AllContext}>{children}</DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
