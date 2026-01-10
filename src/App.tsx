import { Route, Routes, Outlet } from "react-router-dom";
import "./index.css";

/* Layout Components */
import { Navbar } from "@/components/Navbar";

/* Pages */
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";

// Layout with Navbar
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Routes WITH Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        {/* Add more routes that need navbar here */}
      </Route>

      {/* Routes WITHOUT Navbar (Auth pages) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default App;
