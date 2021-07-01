import {useState} from "react"
import Like from "./Like";
import Comment from "./Comment";
import TimeAgo from "react-timeago"
import {useSelector,useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {BiHeart} from "react-icons/bi"
import {
  likeButtonPressed,
  commentButtonPressed,
  likeDataOnTextPressed,
  postDeleteButtonPressed
} from "./postslice";
export default function PostComponent({eachpost}){
  const [commentModal, setCommentModal] = useState("");
  const [likeModal, setLikeModal] = useState("");
  let { userName, userId, following } = useSelector((state) => state.user);
  const dispatch=useDispatch()
    return(
        <div className="relative px-2 py-2 my-3 rounded-lg shadow-md bg-white">
        <Link to={userName===eachpost.user.userName? `/user`:`/${eachpost.user.userName}`} className=" blockflex items-center">
          <img className=" inline w-8 h-8 border-solid border-gray-300 rounded-full" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
          <span className="p-1 ">{`${eachpost.user.userName}`}</span>
        </Link>
        <div className="py-2">{eachpost.caption}</div>
        <div className="absolute right-1 top-1 text-xs text-gray-300 font-normal">
          <TimeAgo date={eachpost.date} />
        </div>
        <div className="flex w-full items-center">
        <button
          className="flex items-center"
          onClick={() =>
            dispatch(
              likeButtonPressed({ postID: eachpost._id, userName: userName })
            )
          }
        >
          <BiHeart className="text-2xl"/>
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
    )
}