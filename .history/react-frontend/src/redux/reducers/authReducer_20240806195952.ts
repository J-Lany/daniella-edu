import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user'; 

export const loginReducer = (state: any, action: PayloadAction<User>) => {
  state.isAuthenticated = true;
  state.user = action.payload;
};

export const logoutReducer = (state: any) => {
  state.isAuthenticated = false;
  state.user = null;
};