import { RootState } from "./../../types/RootState";

export const selectRegistrationError = (state: RootState) => state.registration.error;
export const selectIsRegistrationSucsess = (state: RootState) => state.registration.isRegistrationSucsess;
