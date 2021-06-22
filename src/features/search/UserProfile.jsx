import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TimeAgo from "react-timeago";
import {
  userSearching,
  userProfile,
  followingUserPostCall
} from "./searchSlice";
import { useParams, Link } from "react-router-dom";

export default function UserProfile() {
  //const [userName, setUserName] = useState("");
  let { userProfileDetail, followingUserPost } = useSelector(
    (state) => state.search
  );
  let dispatch = useDispatch();
  let { userName } = useParams();

  useEffect(() => {
    dispatch(userProfile(userName));
    dispatch(followingUserPostCall(userName));
  }, []);
  return (
    <>
      {userProfileDetail !== null && (
        <div>
          <div>UserName: {userProfileDetail.userName}</div>
          <div>Follower: {userProfileDetail.followers.length}</div>
          <div>Following: {userProfileDetail.following.length}</div>
          <hr />
        </div>
      )}
      {followingUserPost.length > 0 && (
        <div>
          {followingUserPost.map((eachpost) => {
            return (
              <div>
                <div>{eachpost.user.userName}</div>
                <div>{eachpost.caption}</div>
                <TimeAgo date={eachpost.date} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
