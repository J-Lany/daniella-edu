import { RootState } from "./../../types/RootState";

export const selectTokent = (state: RootState) => state.auth.accessToken;