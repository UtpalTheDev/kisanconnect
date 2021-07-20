import { Navigate, Link, Route,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ path, ...props }) {
  const { isUserLogIn } = useSelector((state) => state.auth);
  let location=useLocation()
  return isUserLogIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: location.pathname }} replace to="/login" />
  );
}
