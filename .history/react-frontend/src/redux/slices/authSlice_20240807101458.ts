import { createSlice } from '@reduxjs/toolkit';
import { loginAsync, logoutAsync } from '../thunks/authThunks';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    error: '',
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const authReducer = authSlice.reducer;
export default authSlice;