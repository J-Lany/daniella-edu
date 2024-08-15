import { RootState } from "./../../types/RootState";

export const selectToken = (state: RootState) => state.auth.accessToken;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.accessToken;
export const selectRegistrationError = (state: RootState) => state.registration.error;
