import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const NewsOnLoad = createAsyncThunk(
    "news/NewsOnLoad",
    async (errormsg,{ rejectWithValue }) => {
      try {
        
          let response = await axios.get(
            `https://api.thenewsapi.com/v1/news/top?api_token=uWjx9wSBfkieTIEGDCwoICBVfmftqYzil6vhn118&locale=us&limit=4`
          );
          return response.data.data;
        
        }
       catch (error) {
        return rejectWithValue(errormsg);
      }
    }
  );

  export const newsSlice = createSlice({
      name:'news',
      initialState:{
          newsData:[],
          newsStatus:"idle",
          newsError:null
      },
      reducers:{},
      extraReducers:{
          [NewsOnLoad.pending]:(state)=>{
              state.newsStatus="loading"
          },
          [NewsOnLoad.fulfilled]:(state,action)=>{
            state.newsStatus="succeeded"
            state.newsData=action.payload
        },
        [NewsOnLoad.rejected]:(state,action)=>{
            state.newsStatus="failed"
            state.newsError=action.payload
        },
      }
  })

  export default newsSlice.reducer;