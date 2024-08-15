import { createSlice } from '@reduxjs/toolkit';
import {loginReducer, logoutReducer} from '../reducers/authReducer';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
   login: loginReducer,
   logout: logoutReducer,
  },
});


export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;