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
import SideNavigator from "./components/SideNavigator";
import News from "./features/news/News";
import NotFound from "./NotFound"
export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isUserLogIn,getTokenStatus,signupStatus}=useSelector(state=>state.auth)
  
  useEffect(() => {
    const { isUserLoggedIn, localtoken } =
      JSON.parse(localStorage?.getItem("login")) || {};
    isUserLoggedIn && localtoken && dispatch(loginWithToken({ localtoken }));
    setupAuthExceptionHandler(dispatch, navigate);
  }, []);

  function setupAuthExceptionHandler(dispatch, navigate) {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === UNAUTHORIZED) {
          dispatch(logOut());
          navigate("login");
        }
        return Promise.reject(error);
      }
    );
  }

  return (
    <div className="App ">
      <nav>
      <Link to="/" className=" block flex items-center">
        <img src={logo} className="w-10 h-10 rounded-full m-1"/>
        <span className="px-1 text-lg self-end py-0 my-0">KisanConnect</span>
      </Link>
      </nav>

      <div className="sm:grid sm:grid-cols-3 md:grid-cols-5 ">
      {isUserLogIn && <SideNavigator/>}
      {isUserLogIn && <Navigator/>}

      <Routes>
        <PrivateRoute path="/" element={<Posts />} />
        <PrivateRoute path="/:userName" element={<UserProfile />} />
        <PrivateRoute path="/user" element={<User />} />
        <PrivateRoute path="user/edit" element={<UserEdit />} />
        <PrivateRoute path="/notification" element={<Notification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute path="/search" element={<Search />} 
        />
        <Route path="*" element={<NotFound />}/>
      </Routes>
      {isUserLogIn && <News/>}
      </div>
      
      
    </div>
  );
}
