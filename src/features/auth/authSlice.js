import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from "./authService";

const token = localStorage.getItem("token") || "";
const user = JSON.parse(localStorage.getItem("user")) || null;

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loged.fulfilled, (state, action) => {
        state.user = action.payload;
      })
  },
});

export const register = createAsyncThunk("auth/register", async (user) => {
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

export const loged = createAsyncThunk("auth/loged", async () => {
  try {
    return await authService.loged();
  } catch (error) {
    console.error(error);
  }
});


export default authSlice.reducer;

