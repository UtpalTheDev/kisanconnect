import { Navigate, Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ path, ...props }) {
  const { isUserLogIn } = useSelector((state) => state.auth);
  console.log("privateroute");
  return isUserLogIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
