 import { RootState } from "../types/RootState";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;