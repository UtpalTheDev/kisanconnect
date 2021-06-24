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
  console.log("inputs here", inputFields);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(saveButtonPress(inputFields));
        }}
      >
        Name{" "}
        <input
          value={inputFields.name}
          onChange={(e) => {
            setInputFields((prev) => {
              prev.name = e.target.value;
              return { ...prev };
            });
          }}
        />
        UserName
        <input
          value={inputFields.userName}
          onChange={(e) => {
            setInputFields((prev) => {
              prev.userName = e.target.value;
              return { ...prev };
            });
          }}
        />
        Bio{" "}
        <input
          value={inputFields.bio}
          onChange={(e) => {
            setInputFields((prev) => {
              prev.bio = e.target.value;
              return { ...prev };
            });
          }}
        />
        Email{" "}
        <input
          value={inputFields.email}
          onChange={(e) => {
            setInputFields((prev) => {
              prev.email = e.target.value;
              return { ...prev };
            });
          }}
        />
        <button type="submit">Save</button>
      </form>
      {saveButtonPressError}
    </>
  );
}
