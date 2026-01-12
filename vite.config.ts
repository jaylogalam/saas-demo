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
            // Supabase - standalone, no React dependency
            if (id.includes("@supabase")) {
              return "vendor-supabase";
            }
            // Stripe - standalone, no React dependency
            if (id.includes("@stripe")) {
              return "vendor-stripe";
            }
            // Pure utility packages with NO React dependency
            if (
              id.includes("clsx") ||
              id.includes("tailwind-merge") ||
              id.includes("class-variance-authority")
            ) {
              return "vendor-utils";
            }
            // Everything else (React + all React-dependent packages)
            return "vendor-react";
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
