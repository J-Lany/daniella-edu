import { createSlice } from "@reduxjs/toolkit";

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
      state.user = action.payload.user;
      console.log(state)
    }

  }
});

export const {
  reducer: authReducer,
  actions: { setError, clearError, setAuthData }
} = authSlice;
export default authSlice;
