import { useUser } from "@/hooks/useUser";
import { Navigate, Outlet } from "react-router-dom";

function GuestLayout() {
  const { data: user } = useUser();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default GuestLayout;
