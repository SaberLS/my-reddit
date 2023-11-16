import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./reddit_utils";

export const getMorePosts = createAsyncThunk(
  "reddit/getMorePosts",
  async () => {
    const lastPostName = null; //findLastPost();
    const response = await fetchPosts(lastPostName);
    const data = await response.json();
    console.log("getMorePosts :", data);
    return data;
  }
);

const initialState = {
  posts: {},
  status: "idle",
};

export const redditSlice = createSlice({
  name: "reddit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMorePosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMorePosts.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.posts += payload;
      })
      .addCase(getMorePosts.rejected, (state, { payload }) => {
        state.status = payload.error;
      });
  },
});

export const selectStatus = (state) => state.reddit.status;

export default redditSlice.reducer;
