import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  // get all the required states and funtion from Auth0

  const { isAuthenticated, isLoading } = useAuth0();
  // to navigate diffrent routes
  const navigate = useNavigate();

  useEffect(() => {
    // authentication check
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <p>Loading...</p>;
  // protect the child from unAuthorized access !
  return isAuthenticated ? children : null;
}
