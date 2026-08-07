/**
 * ==========================================================
 * ShopNova AI
 * File: GuestRoute.jsx
 *
 * Purpose:
 * Prevent logged-in users from opening
 * Login/Register pages.
 * ==========================================================
 */

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuthenticated } from "../../features/auth";

export default function GuestRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}