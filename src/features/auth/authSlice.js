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
  findUser: null,
  findUserById: null
};


export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    console.error(error);
    const msgError = error.response?.data?.messages?.[0] || "Registration failed";
    return thunkAPI.rejectWithValue(msgError);
  }
});

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await authService.login(user);
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("token", response.token);
    return response;
  } catch (error) {
    console.error(error);
    const msgError = error.response?.data?.message || "Login failed";
    return thunkAPI.rejectWithValue(msgError);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await authService.logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return;
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

export const getUserById = createAsyncThunk("auth/getUserById", async (id) => {
  try {
    return await authService.getUserById(id);
  } catch (error) {
    console.error(error);
  }
});

export const profilePicture = createAsyncThunk("auth/profilePicture", async (formUser) => {
  try {
    return await authService.profilePicture(formUser);
  } catch (error) {
    console.error(error);
  }
});

export const follow = createAsyncThunk("posts/follow", async (userId) => {
  try {
    return await authService.follow(userId);
  } catch (error) {
    throw error;
  }
});

export const unfollow = createAsyncThunk("posts/unfollow", async (userId) => {
  try {
    return await authService.unfollow(userId);
  } catch (error) {
    throw error;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload.message;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
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

export const { reset } = authSlice.actions;

export default authSlice.reducer;
