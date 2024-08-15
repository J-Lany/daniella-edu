import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth-api";
import { setError, setAuthData } from "../slices/authSlice";
import { AuthData } from "../../types/AuthData";
import packageJson from "../../../package.json";

export const loginAsync = createAsyncThunk("auth/login", async (authData: AuthData, { dispatch }) => {
 
    const response = await fetch(`${packageJson.baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(authData)
    });

    const data = await response.json();

    if (!response.ok) {
      dispatch(setError(data.message));
      return
    }

    dispatch(setAuthData(data));


});

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await authApi.logout();
    return response.data;
  } catch (error) {
    throw error;
  }
});
