import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";

/* Layout Components */
import { PublicLayout } from "@/app/layouts/PublicLayout";
import { AppLayout } from "@/app/layouts/AppLayout";

/* Lazy Loaded Pages */
const LandingPage = lazy(() => import("@/app/public/LandingPage"));
const LoginPage = lazy(() => import("@/app/auth/LoginPage"));
const SignupPage = lazy(() => import("@/app/auth/SignupPage"));
const ForgotPasswordPage = lazy(() => import("@/app/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/app/auth/ResetPasswordPage"));
const PricingPage = lazy(() => import("@/app/public/PricingPage"));
const AboutPage = lazy(() => import("@/app/public/AboutPage"));
const ProfilePage = lazy(() => import("@/app/ProfilePage"));
const SettingsPage = lazy(() => import("@/app/SettingsPage"));
const BillingPage = lazy(() => import("@/app/BillingPage"));
const DashboardPage = lazy(() => import("@/app/DashboardPage"));
const ProjectsPage = lazy(() => import("@/app/ProjectsPage"));
const AnalyticsPage = lazy(() => import("@/app/AnalyticsPage"));
const AdminUsersPage = lazy(() => import("@/app/admin/AdminUsersPage"));
const AdminSubscriptionsPage = lazy(
  () => import("@/app/admin/AdminSubscriptionsPage"),
);
const TestUIPage = lazy(() => import("@/app/admin/TestUIPage"));

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
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route
            path="/admin/subscriptions"
            element={<AdminSubscriptionsPage />}
          />
          <Route path="/admin/test-ui" element={<TestUIPage />} />
        </Route>

        {/* Routes WITHOUT Navbar (Auth pages) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </>
  );
}

export default App;
