import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from "./authService";

const token = localStorage.getItem("token") || "";
const user = localStorage.getItem("user") || null;

const initialState = {
    user:  user,
    token: token,
    isError: false,
    isSuccess: false,
    message: "",
  };
  
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
  },
});

export const register = createAsyncThunk(
  "auth/register",
  async (user) => {
    try {
      return await authService.register(user);
    } catch (error) {
      console.error(error);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    return await authService.login(user);
  } catch (error) {
    console.error(error);
  }
});


export default authSlice.reducer;

