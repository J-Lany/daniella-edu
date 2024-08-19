import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    isRegSucsess: false,
    error: ""
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    setRegSucsess: (
      state,
      action: PayloadAction<{isRegistrationSucsess:boolean }>
    ) => {
      state.isRegSucsess = action.payload.isRegistrationSucsess;
    },

    clearRegSucsess: (state) => {
      state.isRegSucsess = false;
    },
  }
});

export const {
  reducer: registrationReducer,
  actions: { setError, clearError, setRegSucsess, clearRegSucsess }
} = registrationSlice;
export default registrationSlice;
