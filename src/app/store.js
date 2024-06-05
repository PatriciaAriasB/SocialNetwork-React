import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice';
import posts from '../features/postsSlice';

const store = configureStore({
  reducer: {
    auth,
    posts,
  },
});

export default store;