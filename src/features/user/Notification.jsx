import { useEffect } from "react";
import {
  notificationOnLoad,
  followRequestDataOnNotificationPageLoad,
  followRequestConfirmButtonPress
} from "./userSlice";
import { useSelector, useDispatch } from "react-redux";
import noNotification from "../../assets/notification.svg"
export default function Notification() {
  let { notification, notificationError } = useSelector((state) => state.user);
  let { followrequestGot, follower } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(followRequestDataOnNotificationPageLoad());
    dispatch(notificationOnLoad());
  }, [follower]);
  return (
    <div className="bg-white p-2 sm:col-span-2 md:col-span-3">
      {followrequestGot ==null && notification==null &&
        <div className="flex justify-center items-center flex-col">
          <img  className="max-w-xl"src={noNotification}/>
          <div className="mb-5"> You don't have any notifications to see</div>
        </div>  
      }
      {followrequestGot !== null &&
        followrequestGot.map((eachrequest) => {
          return (
            <div className="shadow-md py-2 px-2 bg-white flex justify-between items-center">
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1520451644838-906a72aa7c86?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="h-10 w-10 rounded-full" />
                <div className="px-2">{eachrequest.userName}</div>
                </div>
              <button
                className="bg-blue-800 py-0.5 px-1 text-white text-sm rounded-md"
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
          <div className="border-b py-2 px-2 my-2 max-h-14 bg-white pb-1">
            {item}
          </div>);
        })}
    </div>
  );
}
