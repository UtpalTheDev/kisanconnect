import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  likeButtonPressed,
  commentSendButtonPressed,
  commentButtonPressed,
  postButtonPressed,
  clearStatus,
  postDeleteButtonPressed
} from "./postslice";
import TimeAgo from "react-timeago";
export default function Posts() {
  const [post, setPost] = useState("");
  const [modal, setModal] = useState("");
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
    <>
      <div>
        <input
          value={post}
          onChange={(e) => {
            setPost(e.target.value);
          }}
        />
        <button
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
      <div>
        {postData.map((item) => {
          return (
            <div>
              <div>{`"${item.user.userName}"`}</div>
              <div>{item.caption}</div>
              <div>
                <TimeAgo date={item.date} />
              </div>
              <button
                onClick={() =>
                  dispatch(
                    likeButtonPressed({ postID: item._id, userName: userName })
                  )
                }
              >
                {item.likes.length} like
              </button>
              <button
                onClick={() => {
                  dispatch(commentButtonPressed(item._id));
                  setModal(item._id);
                }}
              >
                Comment
              </button>
              {item.user.userID === userId && (
                <button
                  onClick={() => {
                    dispatch(postDeleteButtonPressed({ postdeleteobj: item }));
                  }}
                >
                  delete
                </button>
              )}
              {modal === item._id && (
                <Comment postID={item._id} setModal={setModal} postObj={item} />
              )}

              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}

function Comment({ postID, setModal, postObj }) {
  const [comment, setComment] = useState("");
  let { commentData } = useSelector((state) => state.post);
  let { userName, userId } = useSelector((state) => state.user);

  let dispatch = useDispatch();
  console.log("commentData", commentData);

  return (
    <div className="comment">
      <div className="comment-header">
        Comments
        <button
          className="comment-header-backbutton"
          onClick={() => {
            setModal("");
          }}
        >
          back
        </button>
      </div>
      <div className="comment-onpost">
        <div>{postObj.user.userName}</div>
        <div>{postObj.caption}</div>
      </div>
      <hr />
      <div className="comment-feed">
        {commentData
          .filter((commentobj) => commentobj.postID === postID)
          .map((filterdata) => {
            return (
              <div style={{ border: "1px black solid", marginTop: "0.5rem" }}>
                <div>{filterdata.user.userName}</div>
                <div>{filterdata.caption}</div>
              </div>
            );
          })}
      </div>
      <div className="comment-input">
        <input
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />

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
                  }
                }
              })
            );
            setComment("");
          }}
        >
          Comment
        </button>
      </div>
    </div>
  );
}
