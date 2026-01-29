import { useUser } from "@/hooks/useUser";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { data: user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
