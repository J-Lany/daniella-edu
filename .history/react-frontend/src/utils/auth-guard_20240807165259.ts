import React from "react";
import { Route, RouteProps, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../types/RootState";

interface PrivateRouteProps extends Omit<RouteProps, 'element'> {
  Element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (Element) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <Element  /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;