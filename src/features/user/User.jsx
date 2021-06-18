import { useEffect } from "react";
// import { useLogin } from "./LoginContext";
// import { useReduce } from "./Reducer-context";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../auth/authSlice";
import { resetPost } from "../posts/postslice";
export default function User() {
  const { isUserLogIn, token } = useSelector((state) => state.auth);
  const { name, email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const { dispatch, user } = useReduce();

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       let response = await axios.get(
  //         "https://kisankartbackend.herokuapp.com/user"
  //       );
  //       dispatch({ type: "USER", payload: response.data });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);
  return (
    <div className="user">
      <div className="user-data">
        <div>Name: {name}</div>
        <div>EmailId: {email}</div>
      </div>

      <button
        className="user-logout primary-button"
        onClick={() => {
          dispatch(logOut());
          dispatch(resetPost());
        }}
      >
        logout
      </button>
    </div>
  );
}
