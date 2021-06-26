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
  // console.log("noti", followrequestGot);
  return (
    <div className="bg-white p-2">
      {followrequestGot !== null &&
        followrequestGot.map((eachrequest) => {
          return (
            <div className="shadow-md py-2 px-2 bg-white">
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
          return (
          <div className="border-b py-2 px-2 my-2 max-h-14 bg-white">
            {item}
          </div>);
        })}
    </div>
  );
}
