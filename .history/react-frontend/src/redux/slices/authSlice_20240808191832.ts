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
    },
    setAuthData: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    }

  }
});

export const {
  reducer: authReducer,
  actions: { setError, clearError, setAuthData }
} = authSlice;
export default authSlice;
