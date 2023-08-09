import { ReactNode, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface ChildComponentProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ChildComponentProps) => {
  let isAuthenticated = !!localStorage.getItem("api_token");

  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
