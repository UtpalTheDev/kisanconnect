import {useSelector,useDispatch} from "react-redux"
import {useState} from "react";
import {commentSendButtonPressed} from "./postslice";
export default function Comment({ postID, setCommentModal, postObj }) {
    const [comment, setComment] = useState("");
    let { commentData } = useSelector((state) => state.post);
    let { userName, userId } = useSelector((state) => state.user);
  
    let dispatch = useDispatch();
    console.log("commentData", commentData);
  
    return (
      <div className="comment w-screen">
        <div className="comment-header">
          Comments
          <button
            className="comment-header-backbutton"
            onClick={() => {
              setCommentModal("");
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