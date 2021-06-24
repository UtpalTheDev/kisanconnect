import { useEffect } from "react";
// import { useLogin } from "./LoginContext";
// import { useReduce } from "./Reducer-context";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../auth/authSlice";
import { resetPost } from "../posts/postslice";
import { Link } from "react-router-dom";
import {
  userSpecificPostOnLoad,
  resetUser,
  followSuggestion,
  followButtonPress,
  userDataOnUserPageLoad,
  followingButtonPress
} from "./userSlice";

export default function User() {
  const { isUserLogIn, token } = useSelector((state) => state.auth);
  const {
    userName,
    email,
    userposts,
    notificationError,
    followSuggestionList,
    followrequestSent,
    followrequestGot,
    following,
    follower
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userDataOnUserPageLoad());
    dispatch(userSpecificPostOnLoad());
    dispatch(followSuggestion());
  }, []);
  console.log("userposts", userposts);
  console.log("notification err", notificationError);
  console.log("followrequestsent", followrequestSent);
  console.log("followrequestgot", followrequestGot);

  return (
    <div className="user">
      <div className="user-data">
        <div>userName: {userName}</div>
        <div>EmailId: {email}</div>
        <div>Follower: {follower.length}</div>
        <div>Following: {following.length}</div>
      </div>

      <button
        className="user-logout primary-button"
        onClick={() => {
          dispatch(logOut());
          dispatch(resetPost());
          dispatch(resetUser());
        }}
      >
        logout
      </button>
      <Link to="/user/edit">edit</Link>
      <hr />
      {followSuggestionList !== null &&
        followSuggestionList.map((item) => {
          return (
            <div>
              <div>{item.userName}</div>

              {followrequestSent.find(
                (pendingobj) => pendingobj._id === item._id
              ) && (
                <button
                  onClick={() => {
                    dispatch(followButtonPress({ followerId: item._id }));
                  }}
                >
                  Requested
                </button>
              )}

              {!followrequestSent.find(
                (pendingobj) => pendingobj._id === item._id
              ) &&
                !following.find(
                  (followingobj) => followingobj._id === item._id
                ) && (
                  <button
                    onClick={() => {
                      dispatch(followButtonPress({ followerId: item._id }));
                    }}
                  >
                    Follow
                  </button>
                )}

              {following.find(
                (followingobj) => followingobj._id === item._id
              ) && (
                <button
                  onClick={() => {
                    dispatch(followingButtonPress({ followingId: item._id }));
                  }}
                >
                  Following
                </button>
              )}
            </div>
          );
        })}
      <hr />
      {userposts !== null && (
        <div>
          {userposts.map((eachpost) => {
            return (
              <div>
                <div>{eachpost.user.userName}</div>
                <div>{eachpost.caption}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
