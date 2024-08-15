import { PropsWithChildren, ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../redux/selectors/authSelectors";

type ProtectedRouteProps = PropsWithChildren<{}>;

export default function ProtectedRoute({ children }: ProtectedRouteProps): ReactElement | null {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return <>{children}</>;
}
