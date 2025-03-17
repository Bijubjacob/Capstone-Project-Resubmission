import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/auth_context";
import React, { useEffect } from "react";

export default function ProtectedRoutes() {
  const { cookies } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      // If the token is not present, redirect to the login page
      navigate("/auth");
    }
  }, [cookies.token, navigate]); // Dependency array ensures this runs when cookies.token changes

  if (!cookies.token) {
    // If the token is not present, show a message while redirecting
    return <h1>You are not authorized to view this page!</h1>;
  }

  return <Outlet />;
}
