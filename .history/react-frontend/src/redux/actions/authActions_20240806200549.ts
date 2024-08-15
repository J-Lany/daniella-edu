import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user'; 

export const login = (state: any, action: PayloadAction<User>) => {
  state.isAuthenticated = true;
  state.user = action.payload;
};

export const logout = (state: any) => {
  state.isAuthenticated = false;
  state.user = null;
};