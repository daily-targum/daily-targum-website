module.exports = {
  testEnvironment: "node",
  setupFiles: ["./jest.setup.js"],
  testPathIgnorePatterns: ["./.next/", "./node_modules/"],
  testMatch: [
    "**/*.test.js",
    "**/*.test.jsx",
    "**/*.test.ts",
    "**/*.test.tsx"
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/**",
  ]
};