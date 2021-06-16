import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const LogInWithCredentials = createAsyncThunk(
  "auth/LogInWithCredentials",
  async (logindata, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        "https://social-media-demo.utpalpati.repl.co/login",
        { user: logindata }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
}
export const signupButtonPressed = createAsyncThunk(
  "auth/signupButtonHandler",
  async (signupdata, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        "https://social-media-demo.utpalpati.repl.co/signup",
        { user: signupdata }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

console.log("authslice");

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isUserLogIn: false,
    token: null,
    getTokenStatus: "idle",
    getTokenError: null,
    signupStatus: "idle",
    signupError: null
  },
  reducers: {
    loginWithToken: (state, action) => {
      console.log("loginwithtoken", action);
      state.token = action.payload.localtoken;
      state.isUserLogIn = true;
      setupAuthHeaderForServiceCalls(action.payload.localtoken);
    },
    logOut: (state) => {
      console.log("logout");
      localStorage?.removeItem("login");
      state.isUserLogIn = false;
      state.token = null;
      state.getTokenStatus = "idle";
      state.getTokenError = null;

      setupAuthHeaderForServiceCalls(null);
    },
    authReset: (state, action) => {
      state.isUserLogIn = false;
      state.token = null;
      state.getTokenStatus = "idle";
      state.getTokenError = null;
    },
    clearStatus: (state) => {
      state.getTokenStatus = "idle";
      state.signupStatus = "idle";
    },
    clearError: (state) => {
      state.getTokenError = null;
      state.signupError = null;
    }
  },
  extraReducers: {
    [LogInWithCredentials.pending]: (state, action) => {
      state.getTokenStatus = "loading..";
    },
    [LogInWithCredentials.fulfilled]: (state, action) => {
      state.getTokenStatus = "succeeded";
      state.token = action.payload.token;
      state.isUserLogIn = true;
      setupAuthHeaderForServiceCalls(action.payload.token);
      localStorage?.setItem(
        "login",
        JSON.stringify({
          isUserLoggedIn: true,
          localtoken: action.payload.token
        })
      );
    },
    [LogInWithCredentials.rejected]: (state, action) => {
      state.getTokenStatus = "failed";
      console.log("error", action.payload.message);
      state.getTokenError = action.payload.message;
    },
    [signupButtonPressed.pending]: (state) => {
      state.signupStatus = "loading";
    },
    [signupButtonPressed.fulfilled]: (state, action) => {
      state.signupStatus = "succeeded";
      state.signupError = null;
    },
    [signupButtonPressed.rejected]: (state, action) => {
      state.signupStatus = "failed";
      state.signupError = action.payload.message;
    }
  }
});
export const {
  loginWithToken,
  Reset,
  clearStatus,
  clearError,
  logOut
} = authSlice.actions;
export default authSlice.reducer;
