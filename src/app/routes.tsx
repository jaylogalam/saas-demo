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
          Component: (await import("@/pages/PublicLandingPage")).default,
        }),
      },
      {
        path: "/pricing",
        lazy: async () => ({
          Component: (await import("@/pages/PublicPricingPage")).default,
        }),
      },
      {
        path: "/about",
        lazy: async () => ({
          Component: (await import("@/pages/PublicAboutPage")).default,
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
              Component: (await import("@/pages/AppDashboardPage")).default,
            }),
          },
          {
            path: "/projects",
            lazy: async () => ({
              Component: (await import("@/pages/AppProjectsPage")).default,
            }),
          },
          {
            path: "/analytics",
            lazy: async () => ({
              Component: (await import("@/pages/AppAnalyticsPage")).default,
            }),
          },
          {
            path: "/profile",
            lazy: async () => ({
              Component: (await import("@/pages/AppProfilePage")).default,
            }),
          },
          {
            path: "/settings",
            lazy: async () => ({
              Component: (await import("@/pages/AppSettingsPage")).default,
            }),
          },
          {
            path: "/billing",
            lazy: async () => ({
              Component: (await import("@/pages/AppBillingPage")).default,
            }),
          },
          {
            path: "/admin/users",
            lazy: async () => ({
              Component: (await import("@/pages/AdminUsersPage")).default,
            }),
          },
          {
            path: "/admin/subscriptions",
            lazy: async () => ({
              Component: (await import("@/pages/AdminSubscriptionsPage"))
                .default,
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
          Component: (await import("@/pages/AuthLoginPage")).default,
        }),
      },
      {
        path: "/signup",
        lazy: async () => ({
          Component: (await import("@/pages/AuthSignupPage")).default,
        }),
      },
    ],
  },
  // Password reset routes (accessible to all)
  {
    path: "/forgot-password",
    lazy: async () => ({
      Component: (await import("@/pages/AuthForgotPasswordPage")).default,
    }),
  },
  {
    path: "/reset-password",
    lazy: async () => ({
      Component: (await import("@/pages/AuthResetPasswordPage")).default,
    }),
  },
]);
