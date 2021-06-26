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
  "user/userSpecificPostOnLoad",
  async (value, { rejectWithValue }) => {
    try {
      let response = await axios.get(
        "https://social-media-demo.utpalpati.repl.co/posts/user_specific_post"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const followSuggestion = createAsyncThunk(
  "user/followSuggestion",
  async (value, { rejectWithValue }) => {
    try {
      let response = await axios.get(
        "https://social-media-demo.utpalpati.repl.co/suggestion/follow"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const followButtonPress = createAsyncThunk(
  "user/followButtonPress",
  async (followobj, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        "https://social-media-demo.utpalpati.repl.co/user/follow",
        followobj
      );
      return response.data.followrequestsent;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userDataOnUserPageLoad = createAsyncThunk(
  "user/userDataOnUserPageLoad",
  async (value, { rejectWithValue }) => {
    try {
      let response = await axios.get(
        "https://social-media-demo.utpalpati.repl.co/user/details"
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const followRequestDataOnNotificationPageLoad = createAsyncThunk(
  "user/followRequestDataOnNotificationPageLoad",
  async (value, { rejectWithValue }) => {
    try {
      let response = await axios.get(
        "https://social-media-demo.utpalpati.repl.co/user/follow_requests"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const followRequestConfirmButtonPress = createAsyncThunk(
  "user/followRequestConfirmButtonPress",
  async (requesterobj, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        "https://social-media-demo.utpalpati.repl.co/user/follow_request_action",
        requesterobj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const followingButtonPress = createAsyncThunk(
  "user/followingButtonPress",
  async (followingobj, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        "https://social-media-demo.utpalpati.repl.co/user/unfollow",
        followingobj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const saveButtonPress = createAsyncThunk(
  "user/saveButtonPress",
  async (updatedobj, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        "https://social-media-demo.utpalpati.repl.co/user/update",
        { updatedobj }
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
    userName: null,
    name: null,
    email: null,
    bio: "",
    following: [],
    follower: [],
    followSuggestionList: null,
    userposts: [],
    followrequestGot: null,
    followrequestSent: [],
    userpostsStatus: "idle",
    userpostsError: null,
    notification: null,
    userDataStatus: "idle",
    userDataError: null,
    notificationStatus: "idle",
    notificationError: null,
    followSuggestionStatus: "idle",
    followSuggestionError: null,
    saveButtonPressStatus: "idle",
    saveButtonPressError: null
  },
  reducers: {
    resetUser: (state) => {
      state.userId = null;
      state.name = null;
      state.userName = null;
      state.email = null;
      state.follower = [];
      state.userposts = [];
      state.followSuggestionList = null;
      state.followrequestGot = [];
      state.followrequestSent = [];
      state.userpostsStatus = "idle";
      state.userpostsError = null;
      state.notification = null;
      state.userDataStatus = "idle";
      state.userDataError = null;
      state.notificationStatus = "idle";
      state.notificationError = null;
      state.saveButtonPressStatus = "idle";
      state.saveButtonPressError = null;
    }
  },
  extraReducers: {
    [userDataOnLoginButtonPress.pending]: (state) => {
      state.userDataStatus = "loading";
    },
    [userDataOnLoginButtonPress.fulfilled]: (state, action) => {
      state.userDataStatus = "succeeded";
      console.log("kd", action);
      state.userId = action.payload._id;
      state.userName = action.payload.userName;
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
      console.log("noterr", action);
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
      state.userStatus = "failed";
      state.userpostsError = action.payload.message;
    },
    [followSuggestion.pending]: (state) => {
      state.followSuggestionStatus = "loading";
    },
    [followSuggestion.fulfilled]: (state, action) => {
      state.followSuggestionStatus = "succeeded";
      state.followSuggestionList = action.payload;
    },
    [followSuggestion.rejected]: (state, action) => {
      state.followSuggestionStatus = "failed";
      state.followSuggestionError = action.payload.message;
    },
    [followButtonPress.pending]: (state) => {
      state.followRequestStatus = "loading";
    },
    [followButtonPress.fulfilled]: (state, action) => {
      state.followRequestStatus = "succeeded";
      state.followrequestSent = action.payload;
    },
    [followButtonPress.rejected]: (state, action) => {
      state.followRequestStatus = "failed";
      // state.followSuggestionError = action.payload.message;
    },
    [userDataOnUserPageLoad.pending]: (state) => {
      state.userDataStatus = "loading";
    },
    [userDataOnUserPageLoad.fulfilled]: (state, action) => {
      state.userDataStatus = "succeeded";
      console.log("payload", action);
      const {
        followers,
        following,
        followrequestsent,
        bio,
        name
      } = action.payload;
      state.follower = followers;
      state.following = following;
      state.followrequestSent = followrequestsent;
      state.name = name;
      state.bio = bio;
    },
    [userDataOnUserPageLoad.rejected]: (state, action) => {
      state.userDataStatus = "failed";
      // state.followSuggestionError = action.payload.message;
    },
    [followRequestDataOnNotificationPageLoad.pending]: (state) => {
      state.userDataStatus = "loading";
    },
    [followRequestDataOnNotificationPageLoad.fulfilled]: (state, action) => {
      state.userDataStatus = "succeeded";
      state.followrequestGot = action.payload.followrequestgot;
    },
    [followRequestDataOnNotificationPageLoad.rejected]: (state, action) => {
      state.userDataStatus = "failed";
      // state.followSuggestionError = action.payload.message;
    },
    [followRequestConfirmButtonPress.pending]: (state) => {
      state.userDataStatus = "loading";
    },
    [followRequestConfirmButtonPress.fulfilled]: (state, action) => {
      state.userDataStatus = "succeeded";

      const { _id, userName } = action.payload.requesterobj;

      state.followrequestGot = state.followrequestGot.filter(
        (item) => item._id !== _id
      );
      state.follower.push({ _id, userName });
      // console.log("got", state.followrequestGot);
    },
    [followRequestConfirmButtonPress.rejected]: (state, action) => {
      state.userDatatStatus = "failed";
      const { _id } = action.payload.requesterobj;
      state.followrequestGot = state.followrequestGot.filter(
        (item) => item._id !== _id
      );
    },
    [followingButtonPress.pending]: (state) => {
      state.userDataStatus = "loading";
    },
    [followingButtonPress.fulfilled]: (state, action) => {
      state.userDataStatus = "succeeded";
      const { followingId } = action.payload;
      state.following = state.following.filter(
        (item) => item._id !== followingId
      );
    },
    [followingButtonPress.rejected]: (state, action) => {
      state.userDataStatus = "failed";
    },
    [saveButtonPress.pending]: (state) => {
      state.saveButtonPressStatus = "loading";
      state.saveButtonPressError = null;
    },
    [saveButtonPress.fulfilled]: (state, action) => {
      state.saveButtonPressStatus = "succeeded";
      let { userName, email, bio, name } = action.payload;
      state.userName = userName;
      state.email = email;
      state.bio = bio;
      state.name = name;
    },
    [saveButtonPress.rejected]: (state, action) => {
      state.saveButtonPressStatus = "failed";
      state.saveButtonPressError = action.payload.message;
    }
  }
});
export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
