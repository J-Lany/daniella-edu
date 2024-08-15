import { PropsWithChildren, ReactElement } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { RootState } from "../types/RootState";

type ProtectedRouteProps = PropsWithChildren<{}>;

export default function ProtectedRoute({ children }: ProtectedRouteProps): ReactElement | null {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate()

  if(!isAuthenticated) {
    navigate("/login")
  }

  return <>{children}</> 
}
