import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  likeButtonPressed,
  commentSendButtonPressed,
  commentButtonPressed,
  postButtonPressed
} from "./postslice";

export default function Posts() {
  const [post, setPost] = useState("");
  const [modal, setModal] = useState("");
  let { getPostStatus, postError, postData } = useSelector(
    (state) => state.post
  );
  let dispatch = useDispatch();
  console.log(getPostStatus, postError, postData);
  const userID = "utpal8";
  useEffect(() => {
    if (getPostStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [getPostStatus, dispatch]);
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
                  user: {
                    userID: userID,
                    name: "up"
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
              <div>{`"${item.user.name}"`}</div>
              <div>{item.caption}</div>
              <button
                onClick={() =>
                  dispatch(likeButtonPressed({ postID: item._id, userID }))
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
  let dispatch = useDispatch();
  console.log("commentData", commentData);
  const userID = "utpal8";
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
        <div>{postObj.user.name}</div>
        <div>{postObj.caption}</div>
      </div>
      <hr />
      <div className="comment-feed">
        <div>
          {commentData
            .filter((commentobj) => commentobj.postID === postID)
            .map((filterdata) => {
              return (
                <div>
                  <div>{filterdata.user.name}</div>
                  <div>{filterdata.caption}</div>
                </div>
              );
            })}
        </div>
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
                    userID: userID,
                    name: "up"
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
