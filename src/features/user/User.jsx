import { useEffect } from "react";
// import { useLogin } from "./LoginContext";
// import { useReduce } from "./Reducer-context";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../auth/authSlice";
import { resetPost } from "../posts/postslice";
import { userSpecificPostOnLoad } from "./userSlice";

export default function User() {
  const { isUserLogIn, token } = useSelector((state) => state.auth);
  const { name, email, userposts } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userSpecificPostOnLoad());
  }, []);
  return (
    <div className="user">
      <div className="user-data">
        <div>Name: {name}</div>
        <div>EmailId: {email}</div>
      </div>
      <button
        className="user-logout primary-button"
        onClick={() => {
          dispatch(logOut());
          dispatch(resetPost());
        }}
      >
        logout
      </button>
      {userposts && (
        <div>
          {userposts.map((eachpost) => {
            return (
              <div>
                <div>{eachpost.user.name}</div>
                <div>{eachpost.caption}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
