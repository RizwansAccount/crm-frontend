import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./RouteConstants";
import { Config, getLocalStorage } from "../constants/Index";
import Navbar from "../components/navbar/Navbar";

function ProtectedRoutes() {
  const isLoggedInUser = getLocalStorage(Config.userToken);

  if (!isLoggedInUser) {
    return <Navigate to={ROUTES.login} replace />;
  };

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default ProtectedRoutes;