import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostComponent from "./PostComponent";
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
import emptyPost from "../../assets/clean-air.svg"

export default function Posts() {
  const [post, setPost] = useState("");
  let { getPostStatus, postError, postData } = useSelector(
    (state) => state.post
  );
  let { userName, userId, following } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());

  }, [following]);
  return (
 
    <div className="min-h-screen bg-yellow-50 sm:col-span-2 md:col-span-3">
      
      <div className="w-full h-auto shadow-md bg-white p-1.5 rounded-b-xl">
        <textarea
          value={post}
          rows=""
          cols=""
          className=" block w-full min-h-1 border-b resize-none focus:outline-none
           focus:border-blue-300 mx-auto "
          placeholder="whats going on?"
          onChange={(e) => {
            setPost(e.target.value);
          }}
        />
        <div className="flex justify-end">
        <button
        className=" rounded-md block w-16 bg-blue-100 m-2 p-0.5"
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
            setPost("")
          }}
        >
          Post
        </button>
        </div>
        
      </div>
      
      <div className="px-2 pt-4 pb-10 flex flex-col h-full ">
        {postData.length===0 && 
        <div className="flex justify-center items-center flex-col">
        <img  className="max-w-xl"src={emptyPost}/>
        <div className="mb-5"> You don't have any post to see</div>
       </div>  
        }
        {postData.length!==0 && postData.map((item) => {
          return (
              <PostComponent eachpost={item} />
          );
        })}
      </div>
      
    </div>

   
  );
}


