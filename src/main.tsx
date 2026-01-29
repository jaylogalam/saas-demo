import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// React Query
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

// React Router
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";

// React Query Devtools
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Auth state listener
import "@/lib/auth";

// Toast notifications
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" theme="dark" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
