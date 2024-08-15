import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../types/RootState";

interface PrivateRouteProps {
  path: string;
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <Route path={path} element={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;