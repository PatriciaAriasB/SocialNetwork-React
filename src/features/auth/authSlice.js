import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const token = localStorage.getItem("token") || "";
const user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: user,
  token: token,
  isError: false,
  isSuccess: false,
  message: "",
  findUser: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload.message;
        state.isSuccess = true
      })
      .addCase(loged.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      .addCase(getUserByName.fulfilled, (state, action) => {
        state.findUser = action.payload;
      })
  },
});

export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    console.error(error);
    const msgError = error.response.data.messages[0]
    return thunkAPI.rejectWithValue(msgError);
  }
}
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    console.error(error);
    const msgError = error.response.data.message
    return thunkAPI.rejectWithValue(msgError)
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return await authService.logout();
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
export const getUserByName = createAsyncThunk("auth/getUserByName", async (name) => {
  try {
    return await authService.getUserByName(name);
  } catch (error) {
    console.error(error);
  }
});


export default authSlice.reducer;

export const { reset } = authSlice.actions;