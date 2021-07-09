import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userSearching = createAsyncThunk(
  "search/userSearching",
  async (userName, { rejectWithValue }) => {
    try {
      if (userName !== "") {
        let response = await axios.get(
          `https://social-media-demo.utpalpati.repl.co/search/${userName}`
        );
        return response.data;
      } else {
        return "";
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const userProfile = createAsyncThunk(
  "search/userProfile",
  async (userName, { rejectWithValue }) => {
    try {
      let response = await axios.get(
        `https://social-media-demo.utpalpati.repl.co/user/${userName}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const followingUserPostCall = createAsyncThunk(
  "search/followingUserPostCall",
  async (userName, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        "https://social-media-demo.utpalpati.repl.co/posts/following_user_post",
        { userName }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const followingUserLikeButtonPressed = createAsyncThunk(
  "post/followingUserLikeButtonPressed",
  async (likeupdateobj) => {
    const response = await axios.post(
      "https://social-media-demo.utpalpati.repl.co/posts/likes",
      likeupdateobj
    );
    return response.data;
  }
);
export const searchSlice = createSlice({
  name: "search",
  initialState: {
    matchlist: [],
    followingUserPost: [],
    userProfileDetail: null,
    matchlistStatus: "idle",
    matchlistError: null,
    userProfileStatus: "idle",
    userProfileError: null,
    followingUserPostStatus: "idle",
    followingUserPostError: null,
    followingUserLikeButtonPressedStatus:"idle"
  },
  reducers: {
    clearMatchList: (state) => {
      state.matchlist = [];
    },
    userProfileDetailReset: (state) => {
      state.userProfileDetail = null;
      state.followingUserPost = [];
      state.userProfileStatus = "idle";
      state.userProfileError = null;
      state.followingUserPostStatus = "idle";
      state.followingUserPostError = null;
      state.followingUserLikeButtonPressedStatus="idle"

    },

  },
  extraReducers: {
    [userSearching.pending]: (state) => {
      state.matchlistStatus = "loading";
      state.matchlist = [];
    },
    [userSearching.fulfilled]: (state, action) => {
      state.matchlistStatus = "succeeded";
      state.matchlist = action.payload;
    },
    [userSearching.rejected]: (state, action) => {
      state.matchlistStatus = "failed";
      state.matchlistError = action.payload.message;
    },
    [userProfile.pending]: (state) => {
      state.userProfileStatus = "loading";
    },
    [userProfile.fulfilled]: (state, action) => {
      state.userProfileStatus = "succeeded";
      state.userProfileDetail = action.payload;
    },
    [userProfile.rejected]: (state, action) => {
      state.userProfileStatus = "failed";
      state.userProfileError = action.payload.message;
    },
    [followingUserPostCall.pending]: (state) => {
      state.followingUserPostStatus = "loading";
    },
    [followingUserPostCall.fulfilled]: (state, action) => {
      state.followingUserPostStatus = "succeeded";
      state.followingUserPost = action.payload;
    },
    [followingUserPostCall.rejected]: (state, action) => {
      state.followingUserPostStatus = "failed";
      state.followingUserPostError = action.payload.message;
    },
    [followingUserLikeButtonPressed.pending]: (state) => {
      state.followingUserLikeButtonPressedStatus = "loading";
    },
    [followingUserLikeButtonPressed.fulfilled]: (state, action) => {
      state.followingUserLikeButtonPressedStatus = "succeeded";
      
    },
    [followingUserLikeButtonPressed.rejected]: (state, action) => {
      state.followingUserLikeButtonPressedStatus = "failed";
      
    }
  }
});
export const { clearMatchList, userProfileDetailReset } = searchSlice.actions;
export default searchSlice.reducer;
