import { useEffect } from "react";
import { notificationOnLoad } from "./userSlice";
import { useSelector, useDispatch } from "react-redux";
export default function Notification() {
  let { notification, notificationError } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(notificationOnLoad());
  }, []);
  console.log("noti", notification);
  return (
    <>
      {notification !== null &&
        notification.map((item) => {
          return <div>{item}</div>;
        })}
    </>
  );
}
