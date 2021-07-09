import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSearching, clearMatchList } from "./searchSlice";
export default function Search() {
  let { matchlist } = useSelector((state) => state.search);
  let { userId } = useSelector((state) => state.user);
  let navigate = useNavigate();
  let dispatch = useDispatch();
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
  }, 300);

  useEffect(() => {
    return dispatch(clearMatchList());
  }, []);
  return (
    <div className="px-1 py-2 sm:col-span-2 md:col-span-3">
      <input
      className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:border-transparent"
        placeholder="search"
        onChange={(e) => {
          //setUserName(e.target.value);

          debounceCaller(e.target.value);
        }}
      />
      <div>
      {matchlist.length > 0 && (
        <div className="pt-4 px-1">
          {matchlist.map((matchuser) => {
            return (
              <div className="py-2">
                {matchuser._id !== userId ? (
                  <Link to={`/${matchuser.userName}`} className="block flex items-center">
                    <img src="https://images.unsplash.com/photo-1598601193393-e750daeefbca?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQ2fHxwZW9wbGV8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="w-10 h-10 rounded-full" />
                    <div className="px-2">{matchuser.userName}</div>
                  </Link>
                ) : (
                  <Link to="/user" className="block flex items-center">                   <img src="https://images.unsplash.com/photo-1598601193393-e750daeefbca?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQ2fHxwZW9wbGV8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="w-10 h-10 rounded-full" />
                  <div className="px-2">{matchuser.userName}</div></Link>
                )}
              </div>
            );
          })}
        </div>
      )}
      </div>

    </div>
  );
}
