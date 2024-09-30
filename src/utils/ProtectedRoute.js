import React from 'react';
import { Navigate } from 'react-router-dom';

// Higher-Order Component for protecting routes
const ProtectedRoute = ({ children }) => {
  const token = window.sessionStorage.getItem('token');

  // If token is available, allow access to the route
  if (token) {
    return children;
  }

  // If no token, redirect to the error page
  return <Navigate to="/contain/error" />;
};

export default ProtectedRoute;
