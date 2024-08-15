import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types/RootState";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return children;
}
