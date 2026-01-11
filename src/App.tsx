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
import PricingPage from "@/pages/PricingPage";
import AboutPage from "@/pages/AboutPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import BillingPage from "@/pages/BillingPage";
import {
  CheckoutSuccessPage,
  CheckoutCancelPage,
} from "@/pages/CheckoutResultPage";

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
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/billing" element={<BillingPage />} />
      </Route>

      {/* Routes WITHOUT Navbar (Auth pages) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Checkout Result Pages */}
      <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
      <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
    </Routes>
  );
}

export default App;
