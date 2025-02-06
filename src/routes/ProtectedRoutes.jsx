import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./RouteConstants";
import { Config, getLocalStorage } from "../constants/Index";

function ProtectedRoutes() {
  const isLoggedInUser = getLocalStorage(Config.userToken);

  if (!isLoggedInUser) {
    return <Navigate to={ROUTES.login} replace />;
  };

  return <Outlet/>
}

export default ProtectedRoutes;