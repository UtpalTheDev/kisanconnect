import { configureStore } from "@reduxjs/toolkit";

import postReducer from "../features/posts/postslice";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import searchReducer from "../features/search/searchSlice";
export default configureStore({
  reducer: {
    post: postReducer,
    auth: authReducer,
    user: userReducer,
    search: searchReducer
  }
});
