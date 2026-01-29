import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/hooks/auth/useUser";

/**
 * Protects routes that require authentication.
 * Redirects to /login if user is not logged in.
 */
export function ProtectedRoute() {
  const { data: user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

/**
 * Protects routes that should only be accessible to guests.
 * Redirects to /dashboard if user is already logged in.
 */
export function GuestRoute() {
  const { data: user } = useUser();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
