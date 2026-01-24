import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";

/* Layout Components */
import { PublicLayout } from "@/app/PublicLayout";
import { AppLayout } from "@/app/AppLayout";
import { ProtectedRoute, GuestRoute } from "@/app/RouteGuards";

/* Lazy Loaded Pages */
const LandingPage = lazy(() => import("@/app/pages/public/LandingPage"));
const LoginPage = lazy(() => import("@/app/pages/auth/LoginPage"));
const SignupPage = lazy(() => import("@/app/pages/auth/SignupPage"));
const ForgotPasswordPage = lazy(
  () => import("@/app/pages/auth/ForgotPasswordPage"),
);
const ResetPasswordPage = lazy(
  () => import("@/app/pages/auth/ResetPasswordPage"),
);
const PricingPage = lazy(() => import("@/app/pages/public/PricingPage"));
const AboutPage = lazy(() => import("@/app/pages/public/AboutPage"));
const ProfilePage = lazy(() => import("@/app/pages/app/ProfilePage"));
const SettingsPage = lazy(() => import("@/app/pages/app/SettingsPage"));
const BillingPage = lazy(() => import("@/app/pages/app/BillingPage"));
const DashboardPage = lazy(() => import("@/app/pages/app/DashboardPage"));
const ProjectsPage = lazy(() => import("@/app/pages/app/ProjectsPage"));
const AnalyticsPage = lazy(() => import("@/app/pages/app/AnalyticsPage"));
const AdminUsersPage = lazy(() => import("@/app/pages/admin/AdminUsersPage"));
const AdminSubscriptionsPage = lazy(
  () => import("@/app/pages/admin/AdminSubscriptionsPage"),
);
const TestUIPage = lazy(() => import("@/app/pages/admin/TestUIPage"));

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

        {/* Protected: Dashboard pages (require auth) */}
        <Route element={<ProtectedRoute />}>
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
        </Route>

        {/* Guest only: Auth pages (redirect if logged in) */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Password reset routes (accessible to all) */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </>
  );
}

export default App;
