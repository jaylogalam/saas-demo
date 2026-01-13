import { Suspense, lazy } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";

/* Layout Components */
import { PublicNavbar } from "@/components/PublicNavbar";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuthStore } from "@/store/authStore";
import { PageLoader } from "@/components/PageLoader";

/* Lazy Loaded Pages */
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const BillingPage = lazy(() => import("@/pages/BillingPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const AnalyticsPage = lazy(() => import("@/pages/AnalyticsPage"));

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

// Layout with public navbar (shows for all users on landing page)
function PublicLayout() {
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

function App() {
  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public pages with navbar */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          {/* Dashboard pages (have their own sidebar/navbar) */}
          <Route element={<DashboardLayout />}>
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
      </Suspense>
    </>
  );
}

export default App;
