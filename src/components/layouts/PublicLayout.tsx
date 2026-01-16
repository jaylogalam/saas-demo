import { PublicNavbar } from "../navbars/PublicNavbar";
import { Outlet } from "react-router-dom";

// Layout with public navbar (shows for all users on landing page)
export function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  );
}
