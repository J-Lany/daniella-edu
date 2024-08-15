import { RootState } from "./../../types/RootState";

export const selectRegistrationError = (state: RootState) => state.registration.error;
