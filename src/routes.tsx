import { createBrowserRouter } from "react-router-dom";

/* Layout Components */
import { PublicLayout } from "@/app/PublicLayout";
import { AppLayout } from "@/app/AppLayout";
import { ProtectedRoute, GuestRoute } from "@/app/RouteGuards";

export const router = createBrowserRouter([
  // Public pages with navbar
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        lazy: async () => ({
          Component: (await import("@/app/pages/public/LandingPage")).default,
        }),
      },
      {
        path: "/pricing",
        lazy: async () => ({
          Component: (await import("@/app/pages/public/PricingPage")).default,
        }),
      },
      {
        path: "/about",
        lazy: async () => ({
          Component: (await import("@/app/pages/public/AboutPage")).default,
        }),
      },
    ],
  },
  // Protected: Dashboard pages (require auth)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/dashboard",
            lazy: async () => ({
              Component: (await import("@/app/pages/app/DashboardPage"))
                .default,
            }),
          },
          {
            path: "/projects",
            lazy: async () => ({
              Component: (await import("@/app/pages/app/ProjectsPage")).default,
            }),
          },
          {
            path: "/analytics",
            lazy: async () => ({
              Component: (await import("@/app/pages/app/AnalyticsPage"))
                .default,
            }),
          },
          {
            path: "/profile",
            lazy: async () => ({
              Component: (await import("@/app/pages/app/ProfilePage")).default,
            }),
          },
          {
            path: "/settings",
            lazy: async () => ({
              Component: (await import("@/app/pages/app/SettingsPage")).default,
            }),
          },
          {
            path: "/billing",
            lazy: async () => ({
              Component: (await import("@/app/pages/app/BillingPage")).default,
            }),
          },
          {
            path: "/admin/users",
            lazy: async () => ({
              Component: (await import("@/app/pages/admin/AdminUsersPage"))
                .default,
            }),
          },
          {
            path: "/admin/subscriptions",
            lazy: async () => ({
              Component: (
                await import("@/app/pages/admin/AdminSubscriptionsPage")
              ).default,
            }),
          },
          {
            path: "/admin/test-ui",
            lazy: async () => ({
              Component: (await import("@/app/pages/admin/TestUIPage")).default,
            }),
          },
        ],
      },
    ],
  },
  // Guest only: Auth pages (redirect if logged in)
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        lazy: async () => ({
          Component: (await import("@/app/pages/auth/LoginPage")).default,
        }),
      },
      {
        path: "/signup",
        lazy: async () => ({
          Component: (await import("@/app/pages/auth/SignupPage")).default,
        }),
      },
    ],
  },
  // Password reset routes (accessible to all)
  {
    path: "/forgot-password",
    lazy: async () => ({
      Component: (await import("@/app/pages/auth/ForgotPasswordPage")).default,
    }),
  },
  {
    path: "/reset-password",
    lazy: async () => ({
      Component: (await import("@/app/pages/auth/ResetPasswordPage")).default,
    }),
  },
]);
