module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js", './src/shared/jest.setup.js'],
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