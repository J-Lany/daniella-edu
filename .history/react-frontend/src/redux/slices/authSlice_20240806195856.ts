import { createSlice,  PayloadAction } from '@reduxjs/toolkit';
import {loginReducer} from './reducers/authReducer';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
   
  },
});


export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;