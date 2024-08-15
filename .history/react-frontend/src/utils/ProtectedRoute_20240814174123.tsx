import { PropsWithChildren, ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types/RootState";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren<{}>;

export default function ProtectedRoute({ children }: ProtectedRouteProps): ReactElement | null {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{children}</> : null;
}