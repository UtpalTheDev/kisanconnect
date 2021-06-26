import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {FaRegCommentDots} from "react-icons/fa"
import {
  fetchPosts,
  likeButtonPressed,
  commentSendButtonPressed,
  commentButtonPressed,
  postButtonPressed,
  clearStatus,
  likeDataOnTextPressed,
  postDeleteButtonPressed
} from "./postslice";
import Search from "../search/Search";
import TimeAgo from "react-timeago";
import Like from "./Like";
import Comment from "./Comment";
export default function Posts() {
  const [post, setPost] = useState("");
  const [commentModal, setCommentModal] = useState("");
  const [likeModal, setLikeModal] = useState("");
  let { getPostStatus, postError, postData } = useSelector(
    (state) => state.post
  );
  let { userName, userId, following } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  console.log(getPostStatus, postError, postData);
  useEffect(() => {
    // if (getPostStatus === "idle") {
    dispatch(fetchPosts());
    // let timer = setInterval(() => {
    //   console.log("updating after 15 s")
    //   dispatch(fetchPosts());
    // }, 15000);
    // return ()=>{
    //   clearInterval(timer)
    // }
    // }
  }, [following]);
  return (
    <div className="h-screen bg-yellow-50">
      
      <div className="w-full h-auto shadow-md bg-white p-1.5 rounded-b-xl">
        <textarea
          value={post}
          rows=""
          cols=""
          className=" block w-full min-h-1 border-b-2 resize-none focus:outline-none
           focus:border-blue-300 mx-auto "
          placeholder="whats going on?"
          onChange={(e) => {
            setPost(e.target.value);
          }}
        />
        <button
        className="relative left-3/4 rounded-md block w-16 bg-blue-100 m-2 p-0.5"
          onClick={() => {
            dispatch(
              postButtonPressed({
                postobj: {
                  caption: post,
                  likes: [],
                  date: new Date(),
                  user: {
                    userID: userId,
                    userName: userName
                  }
                }
              })
            );
          }}
        >
          Post
        </button>
      </div>
      
      <div className="px-2 py-4 flex flex-col h-full ">
        {postData.map((item) => {
          return (
            <div className="relative px-2 py-2 my-3 rounded-lg shadow-md bg-white">
              <div className="flex items-center">
                <img className=" inline w-8 h-8 border-solid border-gray-300 rounded-full" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
                <span className="p-1 ">{`${item.user.userName}`}</span>
              </div>
              <div className="py-2">{item.caption}</div>
              <div className="absolute right-1 top-1 text-xs text-gray-300 font-normal">
                <TimeAgo date={item.date} />
              </div>
              <div className="flex w-full">
              <button
                className="flex items-center"
                onClick={() =>
                  dispatch(
                    likeButtonPressed({ postID: item._id, userName: userName })
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
                  setLikeModal(item._id);
                  dispatch(likeDataOnTextPressed(item._id));
                }}
              >
                {item.likes.length} Likes
              </span>
              <button
                className=" px-2 flex items-center"
                onClick={() => {
                  dispatch(commentButtonPressed(item._id));
                  setCommentModal(item._id);
                }}
              >
                <span class="material-icons-outlined text-blue-300">
                 textsms
                </span>
              </button>
              {item.user.userID === userId && (
                <button
                  className="ml-auto flex items-center"
                  onClick={() => {
                    dispatch(postDeleteButtonPressed({ postdeleteobj: item }));
                  }}
                >
                  <span class="material-icons-outlined">
                  delete
                  </span>
                </button>
              )}
              </div>  
              
              {commentModal === item._id && (
                <Comment
                  postID={item._id}
                  setCommentModal={setCommentModal}
                  postObj={item}
                />
              )}
              {likeModal === item._id && (
                <Like
                  postID={item._id}
                  setLikeModal={setLikeModal}
                  postObj={item}
                />
              )}

              
            </div>
          );
        })}
      </div>
      
    </div>
  );
}


