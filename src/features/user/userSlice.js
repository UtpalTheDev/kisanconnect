import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: null,
    email: null,
    following: null,
    follower: null
  },
  reducers: {},
  extraReducers: {}
});

export default userSlice.reducer;
