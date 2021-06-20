import { useEffect } from "react";
import {
  notificationOnLoad,
  followRequestDataOnNotificationPageLoad,
  followRequestConfirmButtonPress
} from "./userSlice";
import { useSelector, useDispatch } from "react-redux";
export default function Notification() {
  let { notification, notificationError } = useSelector((state) => state.user);
  let { followrequestGot, follower } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(followRequestDataOnNotificationPageLoad());
    dispatch(notificationOnLoad());
  }, [follower]);
  console.log("noti", followrequestGot);
  return (
    <>
      {followrequestGot !== null &&
        followrequestGot.map((eachrequest) => {
          return (
            <div style={{ border: "1px solid black" }}>
              {eachrequest.userName}
              <button
                onClick={() => {
                  dispatch(
                    followRequestConfirmButtonPress({
                      requesterId: eachrequest._id
                    })
                  );
                }}
              >
                confirm
              </button>
            </div>
          );
        })}
      {notification !== null &&
        notification.map((item) => {
          return <div>{item}</div>;
        })}
    </>
  );
}
