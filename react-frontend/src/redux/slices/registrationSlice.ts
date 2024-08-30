import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    isRegistrationSucsess: false,
    error: ""
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    setRegSucsess: (state, action: PayloadAction<{ isRegistrationSucsess: boolean }>) => {
      state.isRegistrationSucsess = action.payload.isRegistrationSucsess;
    },

    clearRegSucsess: (state) => {
      state.isRegistrationSucsess = false;
    }
  }
});

export const {
  reducer: registrationReducer,
  actions: { setError, clearError, setRegSucsess, clearRegSucsess }
} = registrationSlice;
export default registrationSlice;
