import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (sort) => {
    const { data } = await axios.get(`/posts?sortBy=${sort}`);
    return data;
  }
);

export const fetchPostsByTag = createAsyncThunk(
  "posts/fetchPostsByTag",
  async (tag) => {
    const { data } = await axios.get(`/tags/${tag}`);
    return data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    axios.delete(`/posts/${id}`);
  }
);

const initialState = {
  sort: {
    name: "Новые",
    sortProperty: "createdAt",
  },
  tag: "",
  posts: {
    items: [],
    status: "loading",
  },
  tags: { items: [], status: "loading" },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
    },
    setTag(state, action) {
      state.tag = action.payload;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },

    [fetchPostsByTag.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostsByTag.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});
export const { setSort, setTag } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
