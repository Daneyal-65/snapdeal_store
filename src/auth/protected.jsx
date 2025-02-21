import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  // get all the required states and funtion from Auth0

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // to navigate diffrent routes
  const navigate = useNavigate();

  useEffect(() => {
    // authentication check
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // protect the child from unAuthorized access !
  return isAuthenticated ? children : null;
}
