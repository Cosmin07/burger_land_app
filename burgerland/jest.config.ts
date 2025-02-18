import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: "./jest/setupTests.ts", // Load Jest setup file
    environment: "jsdom", // Simulate browser environment
    include: ["**/*.spec.tsx"], // Only run .spec.tsx files
    coverage: {
      provider: "istanbul", // Enables test coverage reporting
      reporter: ["text", "json", "html"], // Generates test coverage reports
    },
  },
});
