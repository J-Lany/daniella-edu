import { createSlice } from "@reduxjs/toolkit";
import { loginAsync, logoutAsync } from "../thunks/authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: ""
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = "";
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = "Неверный логин или пароль";
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  }
});

export const {
  reducer: authReducer,
  actions: { setError, clearError }
} = authSlice;
export default authSlice;
