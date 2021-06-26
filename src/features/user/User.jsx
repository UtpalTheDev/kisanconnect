import { useState, useEffect } from "react";
// import { useLogin } from "./LoginContext";
// import { useReduce } from "./Reducer-context";
import {BsFillLockFill} from "react-icons/bs"
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../auth/authSlice";
import { resetPost } from "../posts/postslice";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import Like from "../posts/Like";
import Comment from "../posts/Comment";
import {
  userSpecificPostOnLoad,
  resetUser,
  followSuggestion,
  followButtonPress,
  userDataOnUserPageLoad,
  followingButtonPress
} from "./userSlice";
import {
  likeButtonPressed,
  commentButtonPressed,
  likeDataOnTextPressed,
  postDeleteButtonPressed
} from "../posts/postslice";

export default function User() {
  const [commentModal, setCommentModal] = useState("");
  const [likeModal, setLikeModal] = useState("");
  const { isUserLogIn, token } = useSelector((state) => state.auth);
  const {
    userName,
    name,
    userId,
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
    <div className="user relative min-h-screen">
      <div className="user-data px-2 py-2 bg-white">
        <div className="flex items-center"><BsFillLockFill className="text-sm"/>
        <span className="text-lg">{userName}</span>
        </div>
        <div className="flex items-center px-1 py-2 justify-between">
          <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
           <div className="flex flex-col items-center justify-center">
             <div>{follower.length}</div>
             <div className="font-light text-xs">Followers</div>
             </div>
           <div className="flex flex-col items-center justify-center">
             <div>{following.length}</div>
             <div className="font-light text-xs">Following</div>
           </div>
           </div>

        <div>{name}</div>
        <div className="py-3">  
        <Link to="/user/edit" className="block w-full border border-solid flex justify-center border-gray-200 ">Edit</Link>
        </div> 
      </div>

      <button
        className="absolute top-0 right-0 px-2 py-1 bg-red-300 text-white mx-2"
        onClick={() => {
          dispatch(logOut());
          dispatch(resetPost());
          dispatch(resetUser());
        }}
      >
        logout
      </button>
      
      
      <div className="flex overflow-y-auto bg-white py-2">
      {followSuggestionList !== null &&
        followSuggestionList.map((item) => {
          return (
            <div className="w-28 flex-shrink-0 h-40 mx-2 flex-col text-center rounded-md border border-gray-300 box-border">
              <div className="rounded-b-md flex-grow">
                <img className="w-full" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
              </div>
              <div>{item.userName}</div>

              {followrequestSent.find(
                (pendingobj) => pendingobj._id === item._id
              ) && (
                <button
                  className="text-black w-10/12 border-solid border border-gray-400 bg-white"
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
                  className="text-white bg-blue-700 w-10/12"
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
                className="text-black w-10/12 border-solid border border-gray-400"
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
        </div>
    
      <div className="px-2 pt-4 pb-12 flex flex-col h-full rounded-t-lg shadow-inner bg-yellow-50 mt-7 ">
      {userposts !== null && (
        <div>
          {userposts.map((eachpost) => {
            return (
              <div className="relative px-2 py-2 my-3 rounded-lg shadow-md bg-white">
              <div className="flex items-center">
                <img className=" inline w-8 h-8 border-solid border-gray-300 rounded-full" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
                <span className="p-1 ">{`${eachpost.user.userName}`}</span>
              </div>
              <div className="py-2">{eachpost.caption}</div>
              <div className="absolute right-1 top-1 text-xs text-gray-300 font-normal">
                <TimeAgo date={eachpost.date} />
              </div>
              <div className="flex w-full">
              <button
                className="flex items-center"
                onClick={() =>
                  dispatch(
                    likeButtonPressed({ postID: eachpost._id, userName: userName })
                  )
                }
              >
                <span class="material-icons-outlined">
                favorite
                </span>
              </button>
              <span
              className="text-sm px-1"
                onClick={() => {
                  setLikeModal(eachpost._id);
                  dispatch(likeDataOnTextPressed(eachpost._id));
                }}
              >
                {eachpost.likes.length} Likes
              </span>
              <button
                className=" px-2 flex items-center"
                onClick={() => {
                  dispatch(commentButtonPressed(eachpost._id));
                  setCommentModal(eachpost._id);
                }}
              >
                <span class="material-icons-outlined text-blue-300">
                 textsms
                </span>
              </button>
              {eachpost.user.userID === userId && (
                <button
                  className="ml-auto flex items-center"
                  onClick={() => {
                    dispatch(postDeleteButtonPressed({ postdeleteobj: eachpost }));
                  }}
                >
                  <span class="material-icons-outlined">
                  delete
                  </span>
                </button>
              )}
              </div>  
              
              {commentModal === eachpost._id && (
                <Comment
                  postID={eachpost._id}
                  setCommentModal={setCommentModal}
                  postObj={eachpost}
                />
              )}
              {likeModal === eachpost._id && (
                <Like
                  postID={eachpost._id}
                  setLikeModal={setLikeModal}
                  postObj={eachpost}
                />
              )}

              
            </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
}
