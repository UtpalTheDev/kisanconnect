import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userDataOnLoginButtonPress = createAsyncThunk(
  "user/userDataOnLoginButtonPress",
  async (value, { rejectWithValue }) => {
    try {
      console.log("userDataOnLoginButtonPress");
      let response = await axios.get(
        "https://social-media-demo.utpalpati.repl.co/user"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const notificationOnLoad = createAsyncThunk(
  "user/notificationOnLoad",
  async (value, { rejectWithValue }) => {
    try {
      console.log("notificationOnLoad");
      let response = await axios.get(
        "https://social-media-demo.utpalpati.repl.co/user/notification"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const userSpecificPostOnLoad = createAsyncThunk(
  "user/notificationOnLoad",
  async (value, { rejectWithValue }) => {
    try {
      console.log("serSpecificPostOnLoad");
      let response = await axios.get(
        "https://social-media-demo.utpalpati.repl.co/posts/user_specific_post"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    name: null,
    email: null,
    following: null,
    follower: null,
    userposts: null,
    userpostsStatus: "idle",
    userpostsError: null,
    notification: null,
    userDataStatus: "idle",
    userDataError: null,
    notificationStatus: "idle",
    notificationError: null
  },
  reducers: {},
  extraReducers: {
    [userDataOnLoginButtonPress.pending]: (state) => {
      state.userDataStatus = "loading";
    },
    [userDataOnLoginButtonPress.fulfilled]: (state, action) => {
      state.userDataStatus = "succeeded";
      console.log("kd", action);
      state.userId = action.payload._id;
      state.name = action.payload.userName;
      state.email = action.payload.email;
    },
    [userDataOnLoginButtonPress.rejected]: (state, action) => {
      state.userDataStatus = "failed";
      state.userDataError = action.payload.message;
    },
    [notificationOnLoad.pending]: (state) => {
      state.notificationStatus = "loading";
    },
    [notificationOnLoad.fulfilled]: (state, action) => {
      state.notificationStatus = "succeeded";
      state.notification = action.payload;
    },
    [notificationOnLoad.rejected]: (state, action) => {
      state.notificationStatus = "failed";
      state.notificationError = action.payload.message;
    },
    [userSpecificPostOnLoad.pending]: (state) => {
      state.userpostsStatus = "loading";
    },
    [userSpecificPostOnLoad.fulfilled]: (state, action) => {
      state.userpostsStatus = "succeeded";
      state.userposts = action.payload;
    },
    [userSpecificPostOnLoad.rejected]: (state, action) => {
      state.notificationStatus = "failed";
      state.notificationError = action.payload.message;
    }
  }
});

export default userSlice.reducer;
