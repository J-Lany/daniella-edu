import { createSlice } from '@reduxjs/toolkit';
import {loginAction, logoutAction} from '../actions/authActions';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
   login: loginAction,
   logout: logoutAction,
  },
});


export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;