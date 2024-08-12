import { useDispatch } from "react-redux";
import { AppDispatch } from "../types/AppDispatch";

export const useAppDispatch = () => useDispatch<AppDispatch>();