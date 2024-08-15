import { PropsWithChildren, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../types/RootState";

type ProtectedRouteProps = PropsWithChildren<{}>;

export default function ProtectedRoute({ children }: ProtectedRouteProps): ReactElement | null {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    // Если пользователь не аутентифицирован, перенаправляем его на страницу входа
    return <Navigate to="/login" replace />;
  }

  // В противном случае рендерим переданные children
  return <>{children}</>;
}