import {useSelector,useDispatch} from "react-redux"
import {useState} from "react";
import {commentSendButtonPressed} from "./postslice";
import TimeAgo from "react-timeago"
import {BiArrowBack} from "react-icons/bi"
import {Link} from "react-router-dom";

export default function Comment({ postID, setCommentModal, postObj }) {
    const [comment, setComment] = useState("");
    let { commentData } = useSelector((state) => state.post);
    let { userName, userId } = useSelector((state) => state.user);
  
    let dispatch = useDispatch();
  
    return (
      <div className="fixed z-10 h-screen top-0 left-0 bg-white w-screen">
        <div className="fixed top-0 w-full text-center bg-white py-1">
          Comments
          <button
            className="fixed py-1 left-0 pl-1 text-lg"
            onClick={() => {
              setCommentModal("");
            }}
          >
            <BiArrowBack/>
          </button>
        </div>
        <div className="relative bg-white mt-10 border-b px-2">

              <Link to={userName===postObj.user.userName?`/user`:`/${postObj.user.userName}`}  className="block flex items-center w-max">
                <img className=" inline w-8 h-8 border-solid border-gray-300 rounded-full" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
                <span className="p-1 ">{`${postObj.user.userName}`}</span>
              </Link>
              <div className="py-2">{postObj.caption}</div>
              <div className="absolute right-4 top-1 text-xs text-gray-300 font-normal">
                <TimeAgo date={postObj.date} />
              </div>
             
        </div>
        
        <div className="overflow-y-scroll bg-white pb-8">
          {commentData
            .filter((commentObj) => commentObj.postID === postID)
            .map((filterdata) => {
              return (
                <div className="w-full relative bg-white mt-3 px-2 ">
                <Link to={userName===filterdata.user.userName?`/user`:`/${filterdata.user.userName}`} className=" block flex items-center w-max">
                <img className=" inline w-8 h-8 border-solid border-gray-300 rounded-full" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
                <span className="p-1 ">{`${filterdata.user.userName}`}</span>
              </Link>
              <div className="py-2">{filterdata.caption}</div>
              <div className="absolute right-0 top-1 text-xs text-gray-300 font-normal pr-1">
                <TimeAgo date={filterdata.date} />
              </div>
              </div>
              );
            })}
        </div>
        <div className="px-2 flex  fixed bottom-0 my-1 w-full">
          <div className="flex-grow flex pb-1">
          <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="w-8 h-8 rounded-full"/>
          <input
          className="bg-white  focus:outline-none focus:border-blue-200 px-1 flex-grow"
            placeholder="write something"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          </div>

  
          <button
            onClick={() => {
              dispatch(
                commentSendButtonPressed({
                  commentobj: {
                    postID: postID,
                    caption: comment,
                    likes: [],
                    reply: [],
                    user: {
                      userID: userId,
                      userName: userName
                    },
                    date: new Date()
                  }
                })
              );
              setComment("");
            }}
          >
            Post
          </button>
        </div>
      </div>
    );
  }