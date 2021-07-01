// import { useLogin } from "./LoginContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogInWithCredentials } from "./authSlice";
import { userDataOnLoginButtonPress } from "../user/userSlice";
import logo from "../../assets/logo.svg"
// import treebanner from "./assets/treebanner.png";
export default function Login() {
  let { isUserLogIn, getTokenError } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  let navigate = useNavigate();

  let { state } = useLocation();

  useEffect(() => {
    (async () => {
      if (isUserLogIn) {
        await dispatch(userDataOnLoginButtonPress());
        navigate(state?.from ? state.from : "/", { replace: true });
      }
    })();
  }, [isUserLogIn]);

  async function LoginHandler() {
    dispatch(LogInWithCredentials({ email, password }));
  }
  return (
    <div class="login bg-red text-red fixed top-0 z-10 bg-white min-h-screen w-screen flex flex-col md:flex-row sm:justify-between items-center">
      <div className="w-full sm:w-2/4 flex justify-center  sm:flex-grow flex-col items-center mb-2">
      <img src={logo} className="w-3/6 max-w-md py-2" alt="sideimg" />
      <span className="text-xl py-3">KisanConnect</span>
      </div>
    
      <div className="form-container bg-red text-red align-center px-8">
        <div className="text-center text-xl font-semibold">Login</div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            LoginHandler();
          }}
          className="form"
        >
          <div className="py-1">
          <div className="pr-2">Email</div>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border-solid border rounded-md focus:outline-none py-0.5 px-0.5 focus:ring-2"
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
              className="border-solid border rounded-md focus:outline-none py-0.5 px-0.5 focus:ring-2"
              required
            />
            </div>
            
            
          
          <div className="py-3">
            <button className="bg-gray-300 px-2 rounded-md py-0.5 mx-2">
              <Link to="/signup">Signup</Link>
            </button>
            <button type="submit" className="bg-green-100 text-green-500 px-2 rounded-md py-0.5">
              Login
            </button>
          </div>
        </form>
        <div style={{ color: "red" }}>{getTokenError}</div>
      </div>
    </div>
  
  );
}
