import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSearching, clearMatchList } from "./searchSlice";
export default function Search() {
  //const [userName, setUserName] = useState("");
  let { matchlist } = useSelector((state) => state.search);
  let { userId } = useSelector((state) => state.user);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  //console.log(userName)
  const debounce = (fn, delay) => {
    let timeoutId;
    return function (userName) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        fn(userName);
      }, delay);
    };
  };
  const debounceCaller = debounce((userName) => {
    dispatch(userSearching(userName));
  }, 1000);

  useEffect(() => {
    return dispatch(clearMatchList());
  }, []);
  return (
    <>
      <input
        placeholder="search"
        onChange={(e) => {
          //setUserName(e.target.value);

          debounceCaller(e.target.value);
        }}
      />
      {matchlist.length > 0 && (
        <div>
          {matchlist.map((matchuser) => {
            return (
              <>
                {matchuser._id !== userId ? (
                  <Link to={`/${matchuser.userName}`}>
                    <div>{matchuser.userName}</div>
                  </Link>
                ) : (
                  <Link to="/user">{matchuser.userName}</Link>
                )}
              </>
            );
          })}
        </div>
      )}
    </>
  );
}
