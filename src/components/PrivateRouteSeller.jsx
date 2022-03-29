import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./layout/Spinner";

const PrivateRouteSeller = () => {
  const { loggedIn, checkLogInStatus, currentUser } = useAuthStatus();

  if (checkLogInStatus) {
    return <Spinner />;
  }

  return loggedIn ? (
    currentUser &&
      (currentUser.type === "seller" ? (
        <Outlet />
      ) : (
        <Navigate to="/start-selling" />
      ))
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default PrivateRouteSeller;
