import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  /* Configure: Aliases */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@features": "/src/features",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
    },
  },
});
