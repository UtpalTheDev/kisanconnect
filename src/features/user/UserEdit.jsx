import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveButtonPress } from "./userSlice";
export default function UserEdit() {
  let { name, userName, bio, email, saveButtonPressError } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [inputFields, setInputFields] = useState({
    name: name,
    userName: userName,
    email: email,
    bio: bio
  });
  return (
    <div className="">
      <form
       className="flex flex-col px-2 py-2 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(saveButtonPress(inputFields));
        }}
      >
        <div className="flex py-1.5 justify-between"> 
         <div className="px-1 w-32 flex-shrink-0">Name</div>
        <input
          className="px-1 border rounded-md ml-2 w-72"
          value={inputFields.name}
          onChange={(e) => {
            setInputFields((prev) => {
              prev.name = e.target.value;
              return { ...prev };
            });
          }}
        /></div>
        <div className="flex py-1.5 justify-between">
          <div className="px-1 w-32 flex-shrink-0">UserName</div>
        <input
          className="px-1 border rounded-md ml-2 w-72 flex-shrink-1"
          value={inputFields.userName}
          onChange={(e) => {
            setInputFields((prev) => {
              prev.userName = e.target.value;
              return { ...prev };
            });
          }}
        /></div>
        <div className="flex py-1.5 justify-between">
          <div className="px-1 w-32 flex-shrink-0">Bio</div>
        <input
          className="px-1 border rounded-md ml-2 w-72 flex-shrink-1"
          value={inputFields.bio}
          onChange={(e) => {
            setInputFields((prev) => {
              prev.bio = e.target.value;
              return { ...prev };
            });
          }}
        /></div>
        <div className="flex py-1.5 justify-between">
          <div className="px-1 w-32 flex-shrink-0">Email</div>
        <input
          className="px-1 border rounded-md ml-2 w-72 flex-shrink-1"
          value={inputFields.email}
          onChange={(e) => {
            setInputFields((prev) => {
              prev.email = e.target.value;
              return { ...prev };
            });
          }}
        /></div>
        
        <button type="submit" className="mt-2 text-white bg-blue-800 px-2 py-1 rounded-md self-end">Save</button>
      </form>
      {saveButtonPressError}
    </div>
  );
}
