import './styles/index.css';
import "./styles/app.css";
import { useEffect } from "react";
import Posts from "./features/posts/post";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, logOut } from "./features/auth/authSlice";
import logo from "./assets/logo.svg"
import PrivateRoute from "./features/auth/PriavteRoute";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import User from "./features/user/User";
import Notification from "./features/user/Notification";
import Search from "./features/search/Search";
import UserProfile from "./features/search/UserProfile";
import UserEdit from "./features/user/UserEdit";
import Navigator from "./components/Navigator"
export default function App() {
  console.log("app");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const { isUserLoggedIn, localtoken } =
      JSON.parse(localStorage?.getItem("login")) || {};
    isUserLoggedIn && localtoken && dispatch(loginWithToken({ localtoken }));
    console.log("localtoken", localtoken);
    setupAuthExceptionHandler(dispatch, navigate);
  }, []);

  function setupAuthExceptionHandler(dispatch, navigate) {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === UNAUTHORIZED) {
          console.log("line34");
          dispatch(logOut());
          navigate("login");
        }
        return Promise.reject(error);
      }
    );
  }

  return (
    <div className="App ">
      <nav className="flex items-center">
        <img src={logo} className="w-10 h-10 rounded-full m-1"/>
        <span className="px-1 text-lg self-end py-0 my-0">KisanConnect</span>
      </nav>
      <Navigator/>

      <Routes>
        <PrivateRoute path="/" element={<Posts />} />
        <PrivateRoute path="/:userName" element={<UserProfile />} />
        <PrivateRoute path="/user" element={<User />} />
        <PrivateRoute path="user/edit" element={<UserEdit />} />
        <PrivateRoute path="/notification" element={<Notification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}
