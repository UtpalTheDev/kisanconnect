import "./styles.css";
import { useEffect } from "react";
import Posts from "./features/posts/post";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "./features/auth/authSlice";

import PrivateRoute from "./features/auth/PriavteRoute";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";

export default function App() {
  console.log("app");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const { isUserLoggedIn, localtoken } =
      JSON.parse(localStorage?.getItem("login")) || {};
    isUserLoggedIn && localtoken && dispatch(loginWithToken({ localtoken }));
    setupAuthExceptionHandler(logout, navigate);
  }, []);

  function logout() {}

  function setupAuthExceptionHandler(logoutUser, navigate) {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === UNAUTHORIZED) {
          logoutUser();
          navigate("login");
        }
        return Promise.reject(error);
      }
    );
  }

  return (
    <div className="App">
      <h1 className="app-header">utpal's box</h1>
      <div className="app-body">Put your app body here</div>
      <Routes>
        <PrivateRoute path="/" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
