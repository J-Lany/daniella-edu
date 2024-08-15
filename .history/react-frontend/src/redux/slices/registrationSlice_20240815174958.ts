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
      action: PayloadAction<{registration:boolean }>
    ) => {
      state.isRegSucsess = true;
    }
  }
});

export const {
  reducer: registrationReducer,
  actions: { setError, clearError, setRegData, deleteRegData }
} = registrationSlice;
export default registrationSlice;
