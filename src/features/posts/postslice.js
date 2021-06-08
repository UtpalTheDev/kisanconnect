import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("post/fetchposts", async () => {
  const response = await axios.get("");
  return response.data;
});

export const postslice = createSlice({
  name: "post",
  initialState: {
    postStatus: "idle",
    postError: null,
    postData: [
      {
        postID: "p1201",
        caption: "learning redux",
        likes: 22,
        user: {
          userID: "u1234",
          name: "tanay"
        }
      }
    ]
  },
  reducers: {
    likeButtonPressed: (state, action) => {
      let finddata = state.postData.find(
        (item) => item.postID === action.payload
      );
      finddata.likes = finddata.likes + 1;
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // state.data = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }
  }
});

export const { likeButtonPressed } = postslice.actions;
export default postslice.reducer;
