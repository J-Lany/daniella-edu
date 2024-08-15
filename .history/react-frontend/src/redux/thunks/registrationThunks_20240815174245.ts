import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError, setAuthData, deleteAuthData } from "../slices/authSlice";
import packageJson from "../../../package.json";
import { RootState } from "../../types/RootState";
import { RegistrationData } from "../../types/RegistrationData";

export const registrationAsync = createAsyncThunk("auth/login", async (registrationData: RegistrationData, { dispatch }) => {
  const response = await fetch(`${packageJson.baseUrl}/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(registrationData)
  });

  const data = await response.json();

  if (!response.ok) {
    dispatch(setError(data.message));
    return;
  }

  dispatch(setAuthData(data));
});

