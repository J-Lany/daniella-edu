import { createSlice } from '@reduxjs/toolkit';
import {login, logout} from '../actions/authActions';

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