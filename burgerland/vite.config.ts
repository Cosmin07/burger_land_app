import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config"; // Import Vitest config

// Define Vite configuration with test settings
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Explicitly set the port
  },
  test: {
    globals: true,  // Enables global test functions like `describe`, `it`
    environment: "jsdom", // Use a browser-like environment
    setupFiles: "./vitest.setup.ts", // Optional: Setup file for global config
    exclude: [...configDefaults.exclude, "e2e/**"], // Exclude e2e tests
  },
});

