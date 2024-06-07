import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isLoading: false,
  post: {},
  error: null,
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  try {
    return await postsService.getAllPosts();
  } catch (error) {
    throw error;
  }
});

export const getPostById = createAsyncThunk("posts/getPostById", async (id) => {
  try {
    return await postsService.getById(id);
  } catch (error) {
    throw error;
  }
});

export const createPost = createAsyncThunk("posts/createPost", async (post) => {
  try {
    return await postsService.createPost(post);
  } catch (error) {
    throw error;
  }
});

export const like = createAsyncThunk("posts/like", async (postId) => {
  try {
    return await postsService.like(postId);
  } catch (error) {
    throw error;
  }
});

export const dislike = createAsyncThunk("posts/dislike", async (postId) => {
  try {
    return await postsService.dislike(postId);
  } catch (error) {
    throw error;
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(like.fulfilled, (state, action) => {
        state.posts = state.posts.map(post =>
          post._id === action.payload.post._id ? action.payload.post : post
        );
        console.log(state.posts);
      })
      .addCase(like.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(dislike.fulfilled, (state, action) => {
        state.posts = state.posts.map(post =>
          post._id === action.payload.post._id ? action.payload.post : post
        );
        console.log(state.posts);
      })
      .addCase(dislike.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
export const { reset } = postsSlice.actions;
