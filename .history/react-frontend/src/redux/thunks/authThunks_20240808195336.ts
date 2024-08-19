import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth-api"
import { setError, setAuthData } from "../slices/authSlice";
import { AuthData } from "../../types/AuthData";
import { AxiosError } from "axios";

export const loginAsync = createAsyncThunk("auth/login", async (authData: AuthData,  { dispatch }) => {
  try {
    const response = await authApi.login(authData);
    dispatch(setAuthData(response.data))

  } catch (error) {
    const errorMessage = error.response.data.message;
    dispatch(setError(error));
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