import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";

/* Layout Components */
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { AppLayout } from "@/components/layouts/AppLayout";

/* Lazy Loaded Pages */
const LandingPage = lazy(() => import("@/pages/public/LandingPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const SignupPage = lazy(() => import("@/pages/auth/SignupPage"));
const ForgotPasswordPage = lazy(
  () => import("@/pages/auth/ForgotPasswordPage")
);
const ResetPasswordPage = lazy(() => import("@/pages/auth/ResetPasswordPage"));
const PricingPage = lazy(() => import("@/pages/public/PricingPage"));
const AboutPage = lazy(() => import("@/pages/public/AboutPage"));
const ProfilePage = lazy(() => import("@/pages/app/ProfilePage"));
const SettingsPage = lazy(() => import("@/pages/app/SettingsPage"));
const BillingPage = lazy(() => import("@/pages/app/BillingPage"));
const DashboardPage = lazy(() => import("@/pages/app/DashboardPage"));
const ProjectsPage = lazy(() => import("@/pages/app/ProjectsPage"));
const AnalyticsPage = lazy(() => import("@/pages/app/AnalyticsPage"));

const CheckoutSuccessPage = lazy(() =>
  import("@/pages/CheckoutResultPage").then((module) => ({
    default: module.CheckoutSuccessPage,
  }))
);
const CheckoutCancelPage = lazy(() =>
  import("@/pages/CheckoutResultPage").then((module) => ({
    default: module.CheckoutCancelPage,
  }))
);

function App() {
  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <Routes>
        {/* Public pages with navbar */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        {/* Dashboard pages (have their own sidebar/navbar) */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
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
    </>
  );
}

export default App;
