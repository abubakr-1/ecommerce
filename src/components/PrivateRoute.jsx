import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./layout/Spinner";

const PrivateRoute = () => {
  const { loggedIn, checkLogInStatus } = useAuthStatus();

  if (checkLogInStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-up" />;
};

export default PrivateRoute;
