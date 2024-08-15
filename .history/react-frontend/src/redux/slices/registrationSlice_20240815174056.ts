import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    login: "",
    password: "",
    email: "",
    error: ""
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    setRegData: (state, action: PayloadAction<{ login: string; password: string; email: string; error: string }>) => {
      state.login = action.payload.login;
      state.password = action.payload.password;
      state.email = action.payload.email;
    },
    deleteRegData: (state) => {
      state.login = "";
      state.password = "";
      state.email = "";
    }
  }
});

export const {
  reducer: authReducer,
  actions: { setError, clearError, setRegData, deleteRegData }
} = registrationSlice;
export default registrationSlice;
