import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get(
    `${process.env.REACT_API_BACKEND_URL}/posts`
  );
  return data;
});

export const fetchPostsByType = createAsyncThunk(
  "posts/fetchPostsByType",
  async (typeOfPosts) => {
    const { data } = await axios.get(`/posts/${typeOfPosts}`);
    return data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => axios.delete(`/posts/${id}`)
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // Posts
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = "error";
      state.posts.items = [];
    },
    // Posts by type
    [fetchPostsByType.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPostsByType.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostsByType.rejected]: (state) => {
      state.posts.status = "error";
      state.posts.items = [];
    },
    // Tags
    [fetchTags.pending]: (state) => {
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.status = "error";
      state.tags.items = [];
    },
    // Remove Post
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (post) => post._id !== action.meta.arg
      );
    },
  },
});

export const postsReducer = postsSlice.reducer;
