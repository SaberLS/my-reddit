import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkPostType, fetchPosts, makeGallery } from "./reddit_utils";

export const getMorePosts = createAsyncThunk(
  "reddit/getMorePosts",
  async (lastPostName) => {
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
        payload.data.children.forEach(({ data }) => {
          console.log(data);
          const type = checkPostType(data);
          state.posts = {
            ...state.posts,
            [data.id]: {
              author: data.author,
              id: data.id,
              mediaType: type,
              video:
                type === "hosted:video" ||
                (type === "rich:video") & data.secure_media
                  ? data.secure_media.reddit_video.dash_url
                  : null,
              galleryData:
                type === "gallery"
                  ? makeGallery(data.gallery_data.items, data.media_metadata)
                  : null,
              score: data.score,
              subreddit: data.subreddit_name_prefixed,
              title: data.title,
              url: data.url,
              redditLink: data.permalink,
            },
          };
        });
      })
      .addCase(getMorePosts.rejected, (state, { payload }) => {
        console.log(payload);
        state.status = payload;
      });
  },
});

export const selectStatus = (state) => state.reddit.status;
export const selectPosts = (state) => state.reddit.posts;

export default redditSlice.reducer;
