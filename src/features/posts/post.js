import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, likeButtonPressed } from "./postslice";

export default function Posts() {
  let { postStatus, postError, postData } = useSelector((state) => state.post);
  // let error = useSelector((state) => state.post.error);
  let dispatch = useDispatch();
  // console.log(postStatus,postError,postData);
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts);
    }
  }, [postStatus, dispatch]);
  return (
    <>
      <div>
        {postData.map((item) => {
          return (
            <div>
              <div>{item.caption}</div>
              <button onClick={() => dispatch(likeButtonPressed(item.postID))}>
                {item.likes} like
              </button>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}
