import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from './../../types/User';
import { authApi } from '../../api/auth-api';

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (userData: User) => {
    try {
      const response = await authApi.login(userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      const response = await authApi.logout();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export { loginAsync, logoutAsync };