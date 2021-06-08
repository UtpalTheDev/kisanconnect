import { configureStore } from "@reduxjs/toolkit";

import postReducer from "../features/posts/postslice";

export default configureStore({
  reducer: {
    post: postReducer
  }
});
