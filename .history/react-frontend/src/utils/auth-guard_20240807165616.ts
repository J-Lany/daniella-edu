import React from "react";
import { Route as RouteComponent, RouteProps, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../types/RootState";

interface PrivateRouteProps extends Omit<RouteProps, "element"> {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <RouteComponent {...rest} element={element} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;