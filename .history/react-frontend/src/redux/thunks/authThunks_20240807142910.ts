import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth-api";
import { AuthData } from "../../types/AuthData";

export const loginAsync = createAsyncThunk("auth/login", async (authData: AuthData) => {
  try {
    const response = await authApi.login(authData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await authApi.logout();
    return response.data;
  } catch (error) {
    throw error;
  }
});
