import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TimeAgo from "react-timeago";
import { useNavigate } from "react-router-dom";
import { followButtonPress, followingButtonPress, followRequestConfirmButtonPress } from "../user/userSlice";
import {
  userProfile,
  followingUserPostCall,
  userProfileDetailReset,
  followingUserLikeButtonPressed,
  clearPostStatus
} from "./searchSlice";
import {
  likeButtonPressed,
  commentButtonPressed,
  likeDataOnTextPressed,
  postDeleteButtonPressed
} from "../posts/postslice";
import Like from "../posts/Like";
import Comment from "../posts/Comment";
import { useParams } from "react-router-dom";
import {BsFillLockFill} from "react-icons/bs"

export default function UserProfile() {
  const [commentModal, setCommentModal] = useState("");
  const [likeModal, setLikeModal] = useState("");
  let { userProfileDetail, followingUserPost,followingUserLikeButtonPressedStatus,userProfileStatus  } = useSelector(
    (state) => state.search
  );
  let { followrequestSent, following, userId } = useSelector(
    (state) => state.user
  );
  
  let dispatch = useDispatch();
  let { userName } = useParams();
  const navigate=useNavigate()
  useEffect(() => {
    dispatch(userProfile(userName));
    dispatch(followingUserPostCall(userName));
    if(userProfileDetail===null && userProfileStatus==="succeeded"){
      navigate("*")
    }
    return ()=>{
      dispatch(userProfileDetailReset())
    
    };
    
  }, []);
  useEffect(()=>{
    if(followingUserLikeButtonPressedStatus==="succeeded"){
    dispatch(followingUserPostCall(userName))
  }
  },[followingUserLikeButtonPressedStatus])
  return (
    <div className="user relative min-h-screen sm:col-span-2 md:col-span-3 bg-yellow-50">
      {userProfileDetail !== null && (

        <div className="user-data px-2 pt-4 pb-2 bg-white">
        <div className="flex items-center">
        <span className="text-lg">{userProfileDetail.userName}</span>
        </div>
        <div className="flex items-center px-1 py-2 justify-between">
          <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
           <div className="flex flex-col items-center justify-center">
             <div>{userProfileDetail.followers.length}</div>
             <div className="font-light text-xs">Followers</div>
             </div>
           <div className="flex flex-col items-center justify-center">
             <div>{userProfileDetail.following.length}</div>
             <div className="font-light text-xs">Following</div>
           </div>
           </div>

        <div className="px-1">{userProfileDetail.name}</div>
        <div className="px-1">{userProfileDetail.bio}</div>
        <div className="py-3 px-1">

      {
        followrequestSent.find(
          (pendingobj) => pendingobj._id === userProfileDetail._id
        ) && (
          <button
          className="block w-full border border-solid flex justify-center border-gray-200 rounded-sm"
            onClick={() => {
              dispatch(
                followButtonPress({ followerId: userProfileDetail._id })
              );
            }}
          >
            Requested
          </button>
        )}
      
      {
        userProfileDetail._id !== userId &&
        !followrequestSent.find(
          (pendingobj) => pendingobj._id === userProfileDetail._id
        ) &&
        !following.find(
          (followingobj) => followingobj._id === userProfileDetail._id
        ) && (
          <button
          className="block w-full border border-solid flex justify-center border-blue-700 bg-blue-700 text-white rounded-md"
            onClick={() => {
              dispatch(
                followButtonPress({ followerId: userProfileDetail._id })
              );
            }}
          >
            Follow
          </button>
        )}

      {
        following.find(
          (followingobj) => followingobj._id === userProfileDetail._id
        ) && (
          <button
          className="block w-full border border-solid flex justify-center border-gray-200 rounded-sm"
            onClick={() => {
              dispatch(
                followingButtonPress({ followingId: userProfileDetail._id })
              );
            }}
          >
            Following
          </button>
        )}
      </div>
      </div>

      )}
     <div className="w-screen h-7 bg-white"></div>

      {userProfileDetail?._id &&
        following.find(
          (followingobj) => followingobj._id === userProfileDetail._id
        ) &&
        followingUserPost.length > 0 && (
          <div className="px-2 pt-4 pb-12 flex flex-col h-full  shadow-inner  h-screen ">
            {followingUserPost.map((eachpost) => {
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
                        followingUserLikeButtonPressed({ postID: eachpost._id, userName: userName })
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
  );
}
