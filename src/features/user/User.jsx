import { useState, useEffect } from "react";
import {BsFillLockFill} from "react-icons/bs"
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

import PostComponent from "../posts/PostComponent";

export default function User() {
  
  const {
    userName,
    name,
    bio,
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


  return (
    <div className="user relative min-h-screen sm:col-span-2 md:col-span-3 bg-yellow-50">
      <div className="user-data px-2 pt-4 pb-2 bg-white">
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

        <div className="px-1">{name}</div>
        <div className="px-1">{bio}</div>
        <div className="py-3 px-1">  
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
            <Link to={`/${item.userName}`} className="block">
            <div className="w-28 flex-shrink-0 h-40 mx-2 flex-col text-center rounded-md border border-gray-300 box-border">
              <div className="rounded-b-md flex-grow">
                <img className="w-full" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
              </div>
              <div>{item.userName}</div>
              

              {followrequestSent.find(
                (pendingobj) => pendingobj._id === item._id
              ) && (
                <button
                  className="text-black w-10/12 border-solid border border-gray-400 bg-white text-sm"
                  onClick={(e) => {
                    e.preventDefault()
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
                  className="text-white border border-blue-800 bg-blue-800 w-10/12 text-sm"
                    onClick={(e) => {
                      e.preventDefault()
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
                className="text-black w-10/12 border-solid border border-gray-400 text-sm"
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(followingButtonPress({ followingId: item._id }));
                  }}
                >
                  Following
                </button>
              )}
            </div>
            </Link>
          );
        })}
        </div>
    
      <div className="w-full h-7 bg-white"></div>
      {userposts.length>0 && (
        <div className="px-2 pt-4 pb-12 flex flex-col h-screen  shadow-inner  ">
          {userposts.map((eachpost) => {
            return (
              <PostComponent eachpost={eachpost}/>
            );
          })}
        </div>
      )}
      
    </div>
  );
}
