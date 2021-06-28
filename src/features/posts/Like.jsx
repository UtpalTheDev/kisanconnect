import {useSelector} from "react-redux";
import {BiArrowBack} from "react-icons/bi"
import {Link} from "react-router-dom";
export default function Like({ postID, setLikeModal, postObj }) {
    let { likeData } = useSelector((state) => state.post);
    let {userName}=useSelector((state)=>state.user)
    return (
      <>
        <div className="fixed z-10 h-screen top-0 left-0 bg-white w-screen">
          <div className="fixed top-0 w-full text-center bg-white py-1">
            Likes
            <button
              className="fixed py-1 left-0 pl-1 text-lg"
              onClick={() => {
                setLikeModal("");
              }}
            >
              <BiArrowBack/>
            </button>
          </div>  
            <div className="relative bg-white mt-10 border-b px-2">
              {likeData.length > 0 &&
                likeData.map((liker) => {
                  return (
                  <Link to={userName===liker.userName? `/user` :`/${liker.userName}`} className="flex block items-center py-1">
                    <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="w-10 h-10 rounded-full"/>
                    <div className="px-2">{liker.userName}</div>
                  </Link>);
                })}
            </div>
          
        </div>
      </>
    );
  }