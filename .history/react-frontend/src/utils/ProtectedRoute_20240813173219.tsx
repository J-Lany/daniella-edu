import { PropsWithChildren, ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types/RootState";
import LoginPage from "../pages/Login/Login-page";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren<{}>;

export default function ProtectedRoute({ children }: ProtectedRouteProps): ReactElement | null {
  const isAuthenticated = useSelector((state: RootState) => state.auth.accessToken);

return isAuthenticated ?   <Navigate to="/" replace={true} /> :   <Navigate to="/login" replace={true} />

  return isAuthenticated ? <>{children}</> : <LoginPage />;
}
