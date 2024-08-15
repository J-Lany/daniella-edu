import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError, setAuthData, deleteAuthData } from "../slices/authSlice";
import { AuthData } from "../../types/AuthData";
import packageJson from "../../../package.json";
import { RootState } from "../../types/RootState";

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
    return;
  }

  dispatch(setAuthData(data));
});

export const logoutAsync = createAsyncThunk("auth/logout", async (_, { dispatch, getState }) => {
  const state: RootState =  getState() as RootState;
  const accessToken = state.auth.accessToken;
  const refreshToken = state.auth.refreshToken;

  const response = await fetch(`${packageJson.baseUrl}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ accessToken, refreshToken })
  });

  const data = await response.json();

  if (!response.ok) {
    dispatch(setError(data.message));
    return;
  }

  dispatch(setAuthData(data));
});
