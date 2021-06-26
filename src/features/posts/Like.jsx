import {useSelector} from "react-redux";
export default function Like({ postID, setLikeModal, postObj }) {
    let { likeData } = useSelector((state) => state.post);
  
    return (
      <>
        <div className="like">
          <div className="like-header">
            Likes
            <button
              className="like-header-backbutton"
              onClick={() => {
                setLikeModal("");
              }}
            >
              back
            </button>
            <div>
              {likeData.length > 0 &&
                likeData.map((liker) => {
                  return <div>{liker.userName}</div>;
                })}
            </div>
          </div>
        </div>
      </>
    );
  }