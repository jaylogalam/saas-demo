import { Navigate, Outlet } from "react-router-dom";
import { useSuspenseUser } from "@/hooks/auth/useUser";

/**
 * Protects routes that require authentication.
 * Redirects to /login if user is not logged in.
 */
export function ProtectedRoute() {
  const user = useSuspenseUser();

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
  const user = useSuspenseUser();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
