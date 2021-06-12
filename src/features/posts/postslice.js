import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("post/fetchposts", async () => {
  const response = await axios.get(
    "https://social-media-demo.utpalpati.repl.co/posts"
  );
  // console.log("l",response);
  return response.data;
});
export const likeButtonPressed = createAsyncThunk(
  "post/likeButtonPressed",
  async (likeupdateobj) => {
    const response = await axios.post(
      "https://social-media-demo.utpalpati.repl.co/posts/likes",
      likeupdateobj
    );
    //  console.log("l",response);
    return response.data;
  }
);
export const commentSendButtonPressed = createAsyncThunk(
  "post/commentSendButtonPressed",
  async (commentobj) => {
    const response = await axios.post(
      "https://social-media-demo.utpalpati.repl.co/posts/comment",
      commentobj
    );
    //  console.log("l",response);
    return response.data;
  }
);
export const commentButtonPressed = createAsyncThunk(
  "post/commentButtonPressed",
  async (postID) => {
    const response = await axios.get(
      `https://social-media-demo.utpalpati.repl.co/posts/comment/${postID}`
    );
    //  console.log("l",response);
    return response.data;
  }
);
export const postButtonPressed = createAsyncThunk(
  "post/postButtonPressed",
  async (postobj) => {
    const response = await axios.post(
      "https://social-media-demo.utpalpati.repl.co/posts",
      postobj
    );
    //  console.log("l",response);
    return response.data;
  }
);

export const postslice = createSlice({
  name: "post",
  initialState: {
    getPostStatus: "idle",
    sendPostStatus: "idle",
    commentPostStatus: "idle",
    commentGetStatus: "idle",
    postError: null,
    commentData: [],
    postData: []
  },
  reducers: {},
  extraReducers: {
    /*---------fetchpost-----------------------------*/
    [fetchPosts.pending]: (state, action) => {
      state.getPostStatus = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.getPostStatus = "succeeded";
      state.postData = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.getPostStatus = "failed";
      state.postError = action.error.message;
    },
    /*---------likebutton-----------------------------*/
    [likeButtonPressed.pending]: (state, action) => {
      state.postStatus = "loading";
    },
    [likeButtonPressed.fulfilled]: (state, action) => {
      state.postStatus = "succeeded";
      const { _id, likes } = action.payload.post;
      console.log(_id, likes);
      state.postData.find((item) => item._id === _id).likes = likes;
    },
    [likeButtonPressed.rejected]: (state, action) => {
      state.postStatus = "failed";
      state.postError = action.error.message;
    },
    /*---------commentsendbutton-----------------------------*/
    [commentSendButtonPressed.pending]: (state, action) => {
      state.commentPostStatus = "loading";
    },
    [commentSendButtonPressed.fulfilled]: (state, action) => {
      state.commentPostStatus = "succeeded";
      const { comment } = action.payload;
      state.commentData.push(comment);
    },
    [commentSendButtonPressed.rejected]: (state, action) => {
      state.commentPostStatus = "failed";
      state.postError = action.error.message;
    },
    /*---------commentbutton-----------------------------*/
    [commentButtonPressed.pending]: (state, action) => {
      state.commentGetStatus = "loading";
    },
    [commentButtonPressed.fulfilled]: (state, action) => {
      state.commentGetStatus = "succeeded";
      const { comment } = action.payload;
      state.commentData = state.commentData.filter(
        (item) => item.postID !== comment[0].postID
      );
      state.commentData.push(...comment);
    },
    [commentButtonPressed.rejected]: (state, action) => {
      state.commentGetStatus = "failed";
      state.postError = action.error.message;
    },
    /*---------postbutton-----------------------------*/
    [postButtonPressed.pending]: (state, action) => {
      state.sendPostStatus = "loading";
    },
    [postButtonPressed.fulfilled]: (state, action) => {
      state.sendPostStatus = "succeeded";
      const { post } = action.payload;
      state.postData.push(post);
    },
    [postButtonPressed.rejected]: (state, action) => {
      state.sendPostStatus = "failed";
      state.postError = action.error.message;
    }
  }
});

export default postslice.reducer;
