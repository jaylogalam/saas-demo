import { useAuthStore } from "@/store/authStore";
import { PublicNavbar } from "../navbars/PublicNavbar";
import { Outlet } from "react-router-dom";

// Layout with public navbar (shows for all users on landing page)
export function PublicLayout() {
  const { loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  );
}
