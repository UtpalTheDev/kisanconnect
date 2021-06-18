import { useEffect } from "react";
import { notificationOnLoad } from "./userSlice";
import { useSelector, useDispatch } from "react-redux";
export default function Notification() {
  let { notification } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(notificationOnLoad());
  }, []);
  return (
    <>
      {notification !== null &&
        notification.map((item) => {
          return <div>{item}</div>;
        })}
    </>
  );
}
