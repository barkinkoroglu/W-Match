import React from "react";
import useAuthStatus from "../hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const PrivateRoute = () => {
  const { loggedIn, status } = useAuthStatus();

  if (status) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress color="secondary" size={70} />
      </div>
    );
  }
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
