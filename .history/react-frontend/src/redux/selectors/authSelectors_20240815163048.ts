import { RootState } from "../store";

export const selectTokent = (state: RootState) => state.auth.accessToken;