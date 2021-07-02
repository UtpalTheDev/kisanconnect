import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import logo from "../../assets/logo.svg"
// import treebanner from "./assets/treebanner.png";
import { useSelector, useDispatch } from "react-redux";
import { signupButtonPressed, clearError } from "./authSlice";

export default function Signup() {
  const { isUserLogIn, signupError,signupStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  let { state } = useLocation();
  console.log("form", state);
  //console.log("error",signupError);

  useEffect(() => {
    if (isUserLogIn) {
      navigate(state?.from ? state.from : "/", { replace: true });
    }
    return () => {
      dispatch(clearError());
    };
  }, [isUserLogIn]);

  async function signupHandler() {
    const signupOpearion = await dispatch(
      signupButtonPressed({ name, userName, email, password })
    );
    if (!signupOpearion.error) {
      navigate("/login");
    }
  }
  return (

    <div class="login bg-red text-red fixed top-0 z-10 bg-white min-h-screen w-screen flex flex-col md:flex-row sm:justify-between items-center h-screen overflow-y-scroll pb-2">
    <div className="w-full sm:w-2/4 flex justify-center  sm:flex-grow flex-col items-center mb-2">
    <img src={logo} className="w-3/6 max-w-md py-2" alt="sideimg" />
    <span className="text-xl py-3">KisanConnect</span>
    </div>
  
    <div className="form-container bg-red text-red align-center px-8">
      <div className="text-center text-xl font-semibold">SignUp</div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signupHandler();
        }}
        className="form"
      >
        <div className="py-1">
        <div className="pr-2">UserName</div>
          <input
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className="border-solid border rounded-md focus:outline-none py-0.5 px-2 focus:ring-2"
            required
          />
        </div>
        <div className="py-1">
        <div className="pr-2">Name</div>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="border-solid border rounded-md focus:outline-none py-0.5 px-2 focus:ring-2"
            required
          />
        </div>
        <div className="py-1">
        <div className="pr-2">Email</div>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="border-solid border rounded-md focus:outline-none py-0.5 px-2 focus:ring-2"
            required
          />
        </div>
          
          <div className="py-1">
          <div class="pr-1">Password</div>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="border-solid border rounded-md focus:outline-none py-0.5 px-2 focus:ring-2"
            required
          />
          </div>
          
          
        
        <div className="py-3">
        <button  className="bg-gray-300 px-2 rounded-md py-0.5 mx-2">
        <Link to="/login">Login</Link>
          </button>
          <button 
          type="submit"
          className="bg-green-100 text-green-500 px-2 rounded-md py-0.5">
            Signup
          </button>
          
        </div>
      </form>
      <div style={{ color: "red" }}>{signupError}</div>
    </div>
    { signupStatus==="loading" &&
        <div className="fixed top-0 w-screen h-screen bg-white z-40 flex justify-center items-center">
        <Loader
        type="BallTriangle"
        color="green"
        height={100}
        width={100}
        timeout={1000000} //3 secs
      />
      </div>
      }
  </div>

  );
}
