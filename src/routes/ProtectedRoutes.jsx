import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./RouteConstants";

function ProtectedRoutes() {
  const isLoggedInUser = false;

  if (!isLoggedInUser) {
    return <Navigate to={ROUTES.login} replace />;
  }
  return <Outlet />;
}

export default ProtectedRoutes;