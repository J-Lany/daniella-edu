import { PropsWithChildren, ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types/RootState";
import { Navigate } from "react-router-dom";
import LoginPage from "../pages/Login/Login-page";

type ProtectedRouteProps = PropsWithChildren<{}>;

export default function ProtectedRoute({ children }: ProtectedRouteProps): ReactElement | null {
  const isAuthenticated = useSelector((state: RootState) => state.auth.accessToken);

  return isAuthenticated ? <>{children}</> : <Navigate to={"/login"}  replace/>; 
}
