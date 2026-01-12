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
            // Split React and DOM into their own chunk
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
            // Split Supabase into its own chunk
            if (id.includes("@supabase")) {
              return "vendor-supabase";
            }
            // Split Stripe (Frontend) into its own chunk
            if (id.includes("@stripe")) {
              return "vendor-stripe";
            }
            // Everything else goes here
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
