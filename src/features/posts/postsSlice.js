import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isLoading: false,
  post: {}
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  try {
    return await postsService.getAllPosts();
  } catch (error) {
    console.error(error);
  }
});

export const getPostById = createAsyncThunk("posts/getPostById", async (id) => {
  try {
    return await postsService.getById(id);
  } catch (error) {
    console.error(error);
  }
});

export const createPost = createAsyncThunk("posts/createPost", async (post) => {
  try {
    return await postsService.createPost(post);
  } catch (error) {
    console.error(error);
  }
});

export const like = createAsyncThunk("posts/like", async (postId) => {
  try {
    return await postsService.like(postId);
  } catch (error) {
    console.error(error);
  }
});

export const dislike = createAsyncThunk("posts/dislike", async (postId) => {
  try {
    return await postsService.dislike(postId);
  } catch (error) {
    console.error(error);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) =>{
        state.post = action.payload;
      })
      .addCase(like.fulfilled, (state, action) =>{
        state.post = action.payload;
      })
      .addCase(dislike.fulfilled, (state, action) =>{
        state.post = action.payload;
      })
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;