import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth-api"
import { setError } from "../slices/authSlice";
import { AuthData } from "../../types/AuthData";

export const loginAsync = createAsyncThunk("auth/login", async (authData: AuthData,  { dispatch }) => {
  try {
    const response = await authApi.login(authData);
    return response.data;
  } catch (error) {
    dispatch(setError(error.message));
  }
});

export const logoutAsync = createAsyncThunk("auth/logout", async ( ) => {
  try {
    const response = await authApi.logout();
    return response.data;
  } catch (error) {
    throw error;
  }
});
