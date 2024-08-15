import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth-api"
import { setError, setAuthData } from "../slices/authSlice";
import { AuthData } from "../../types/AuthData";
import packageJson from "../../../package.json";
import { AxiosError } from "axios";

export const loginAsync = createAsyncThunk("auth/login", async (authData: AuthData,  { dispatch }) => {
  try {
    const response = await fetch(`${packageJson.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData)
    });
    
    if (!response.ok) {
      throw new Error('Server error');
    }

    const data = await response.json();
    
    dispatch(setAuthData(data));
  } catch (error) {
    dispatch(setError(error.message || "Something went wrong"));
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
