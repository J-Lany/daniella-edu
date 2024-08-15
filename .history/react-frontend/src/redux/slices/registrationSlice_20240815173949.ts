import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    login: "",
    password: "",
    email: "",
    error: ""
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    setRegData: (state, action: PayloadAction<{ login: string; password: string; email: string; error: string }>) => {
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
