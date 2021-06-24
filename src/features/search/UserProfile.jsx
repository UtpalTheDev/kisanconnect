import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TimeAgo from "react-timeago";
import { followButtonPress, followingButtonPress } from "../user/userSlice";
import {
  userProfile,
  followingUserPostCall,
  userProfileDetailReset
} from "./searchSlice";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  //const [userName, setUserName] = useState("");
  let { userProfileDetail, followingUserPost } = useSelector(
    (state) => state.search
  );
  let { followrequestSent, following, userId } = useSelector(
    (state) => state.user
  );
  let dispatch = useDispatch();
  let { userName } = useParams();

  useEffect(() => {
    dispatch(userProfile(userName));
    dispatch(followingUserPostCall(userName));
    return dispatch(userProfileDetailReset());
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
      {console.log("ll", userProfileDetail?._id !== userId)}

      {userProfileDetail?._id &&
        followrequestSent.find(
          (pendingobj) => pendingobj._id === userProfileDetail._id
        ) && (
          <button
            onClick={() => {
              dispatch(
                followButtonPress({ followerId: userProfileDetail._id })
              );
            }}
          >
            Requested
          </button>
        )}

      {userProfileDetail?._id &&
        userProfileDetail._id !== userId &&
        !followrequestSent.find(
          (pendingobj) => pendingobj._id === userProfileDetail._id
        ) &&
        !following.find(
          (followingobj) => followingobj._id === userProfileDetail._id
        ) && (
          <button
            onClick={() => {
              dispatch(
                followButtonPress({ followerId: userProfileDetail._id })
              );
            }}
          >
            Follow
          </button>
        )}

      {userProfileDetail?._id &&
        following.find(
          (followingobj) => followingobj._id === userProfileDetail._id
        ) && (
          <button
            onClick={() => {
              dispatch(
                followingButtonPress({ followingId: userProfileDetail._id })
              );
            }}
          >
            Following
          </button>
        )}

      {userProfileDetail?._id &&
        following.find(
          (followingobj) => followingobj._id === userProfileDetail._id
        ) &&
        followingUserPost.length > 0 && (
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
