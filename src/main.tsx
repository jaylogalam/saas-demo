import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// React Query
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

// React Router
import { BrowserRouter } from "react-router-dom";

// React Query Devtools
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Auth state listener
import "@/lib/auth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
