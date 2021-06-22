import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSearching } from "./searchSlice";
export default function Search() {
  //const [userName, setUserName] = useState("");
  let { matchlist } = useSelector((state) => state.search);
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
  return (
    <>
      <input
        onChange={(e) => {
          //setUserName(e.target.value);

          debounceCaller(e.target.value);
        }}
      />
      {matchlist.length > 0 && (
        <div>
          {matchlist.map((matchuser) => {
            return (
              <Link to={`/${matchuser.userName}`}>
                <div>{matchuser.userName}</div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
