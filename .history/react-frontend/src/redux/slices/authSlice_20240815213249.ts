import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
    refreshToken: "",
    error: ""
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    setAuthData: (state, action: PayloadAction<{ accessToken: string; refreshToken: string;  }>) => {
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
