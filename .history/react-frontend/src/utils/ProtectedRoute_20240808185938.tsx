import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types/RootState";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login", { replace: true });
  }
  
  return children;
}
