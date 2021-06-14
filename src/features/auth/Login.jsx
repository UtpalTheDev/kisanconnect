// import { useLogin } from "./LoginContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogInWithCredentials } from "./authSlice";
// import treebanner from "./assets/treebanner.png";
export default function Login() {
  let { isUserLogIn, getTokenError } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  let navigate = useNavigate();

  let { state } = useLocation();

  useEffect(() => {
    if (isUserLogIn) {
      navigate(state?.from ? state.from : "/", { replace: true });
    }
  }, [isUserLogIn]);

  async function LoginHandler() {
    dispatch(LogInWithCredentials({ email, password }));
  }
  return (
    <div className="login">
      <div className="login-sideimg">
        {" "}
        <img src={""} style={{ width: "100%", height: "100%" }} alt="sideimg" />
      </div>

      <div className="form-container">
        <h3>Login</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            LoginHandler();
          }}
          className="form"
        >
          <label class="input md">
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              class="input-text"
              required
            />
            <span class="placeholder">Email</span>
          </label>
          <label class="input md">
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              class="input-text"
              required
            />
            <span class="placeholder">Password</span>
          </label>
          <div className="form-action">
            <button class="secondary-button md">
              <Link to="/signup">Signup</Link>
            </button>
            <button type="submit" class="secondary-button md">
              Login
            </button>
          </div>
        </form>
        <div style={{ color: "red" }}>{getTokenError}</div>
      </div>
    </div>
  );
}
