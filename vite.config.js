import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@api": path.resolve(__dirname, "src/api"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
});
