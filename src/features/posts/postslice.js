import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

console.log("postslice");
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
export const postDeleteButtonPressed = createAsyncThunk(
  "post/postDeleteButtonPressed",
  async (deletingobj) => {
    const response = await axios.delete(
      "https://social-media-demo.utpalpati.repl.co/posts/delete",
      { data: deletingobj }
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
    deletePostStatus: "idle",
    commentPostStatus: "idle",
    commentGetStatus: "idle",
    deletePostError: null,
    postError: null,
    commentData: [],
    postData: []
  },
  reducers: {
    clearStatus: (state) => {
      state.getPostStatus = "idle";
      state.sendPostStatus = "idle";
      state.commentGetStatus = "idle";
      state.commentGetStatus = "idle";
    },
    resetPost: (state) => {
      state.getPostStatus = "idle";
      state.sendPostStatus = "idle";
      state.commentPostStatus = "idle";
      state.commentGetStatus = "idle";
      state.postError = null;
      state.commentData = [];
      state.postData = [];
    }
  },
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
      // console.log(_id, likes);
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
    },
    [postDeleteButtonPressed.pending]: (state, action) => {
      state.deletePostStatus = "loading";
    },
    [postDeleteButtonPressed.fulfilled]: (state, action) => {
      state.deletePostStatus = "succeeded";
      const { postdeleteobj } = action.payload;
      state.postData = state.postData.filter(
        (postobj) => postobj._id !== postdeleteobj._id
      );
    },
    [postDeleteButtonPressed.rejected]: (state, action) => {
      state.deletePostStatus = "failed";
      state.deletePostError = action.error.message;
    }
  }
});
export const { clearStatus, resetPost } = postslice.actions;
export default postslice.reducer;
