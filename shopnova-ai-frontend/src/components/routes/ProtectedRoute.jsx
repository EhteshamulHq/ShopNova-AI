/**
 * ==========================================================
 * ShopNova AI
 * File: ProtectedRoute.jsx
 *
 * Purpose:
 * Protect authenticated routes.
 * ==========================================================
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuthenticated } from "../../features/auth";

export default function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}