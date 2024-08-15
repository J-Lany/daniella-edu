import { createAsyncThunk } from "@reduxjs/toolkit";
import { setRegData, setError } from "../slices/registrationSlice";
import packageJson from "../../../package.json";
import { RegistrationData } from "../../types/RegistrationData";

export const registrationAsync = createAsyncThunk(
  "auth/login",
  async (registrationData: RegistrationData, { dispatch }) => {
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

    dispatch(setRegSucsess({registration:true}));
  }
);
