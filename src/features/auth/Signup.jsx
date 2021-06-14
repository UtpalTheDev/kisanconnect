import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

// import treebanner from "./assets/treebanner.png";
import { useSelector, useDispatch } from "react-redux";
import { signupButtonPressed, clearError } from "./authSlice";

export default function Signup() {
  const { isUserLogIn, signupError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
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
      signupButtonPressed({ userName, email, password })
    );
    if (!signupOpearion.error) {
      navigate("/login");
    }
  }
  return (
    <div className="signup">
      <div className="signup-sideimg">
        {" "}
        <img src={""} style={{ width: "100%", height: "100%" }} alt="sideimg" />
      </div>

      <div className="form-container">
        <h3>Signup</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signupHandler();
          }}
          className="form"
        >
          <label class="input md">
            <input
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              class="input-text"
              required
            />
            <span class="placeholder">Name</span>
          </label>
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
            <span class="placeholder">password</span>
          </label>
          <div className="form-action">
            <button class="secondary-button md">
              <Link to="/login">Login</Link>
            </button>
            <button type="submit" class="secondary-button md">
              Signup
            </button>
          </div>
        </form>
        <div style={{ color: "red" }}>{signupError}</div>
      </div>
    </div>
  );
}
