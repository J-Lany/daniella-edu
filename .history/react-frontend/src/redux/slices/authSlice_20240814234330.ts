import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
    refreshToken: "",
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
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    deleteAuthData: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.user = null;
    }
  }
});

export const {
  reducer: authReducer,
  actions: { setError, clearError, setAuthData, deleteAuthData }
} = authSlice;
export default authSlice;