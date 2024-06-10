import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice';
import posts from '../features/posts/postsSlice';

const store = configureStore({
  reducer: {
    auth,
    posts,
  },
});

export default store;
