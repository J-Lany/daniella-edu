import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../types/RootState";

interface PrivateRouteProps extends RouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return ( isAuthenticated ? <Route element={element}  {...rest} /> : <Navigate to="/login" />)
};

export default PrivateRoute;