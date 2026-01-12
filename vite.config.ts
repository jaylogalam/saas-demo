import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  /* Configure: Build */
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Split Supabase into its own chunk (no React dependency)
            if (id.includes("@supabase")) {
              return "vendor-supabase";
            }
            // Split Stripe into its own chunk (no React dependency)
            if (id.includes("@stripe")) {
              return "vendor-stripe";
            }
            // Keep React and ALL React-dependent packages together
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router") ||
              id.includes("@radix-ui") ||
              id.includes("@tanstack") ||
              id.includes("@floating-ui") ||
              id.includes("lucide-react") ||
              id.includes("scheduler") ||
              id.includes("zustand")
            ) {
              return "vendor-react";
            }
            // Everything else (clsx, tailwind-merge, class-variance-authority, etc.)
            return "vendor-utils";
          }
        },
      },
    },
  },

  /* Configure: Aliases */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
