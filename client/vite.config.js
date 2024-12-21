import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@mapbox"]
  },
  resolve: {
    alias: {
      "@": path.resolve(".", "./src"),
    },
  },
})
