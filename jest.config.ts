import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/src"], // Source directory
  testMatch: ["**/?(*.)+(test|spec).[jt]s?(x)"], // Match test files
  moduleDirectories: ["node_modules", "<rootDir>/src"], // Module resolution
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Jest setup file
  testEnvironment: "jsdom", // Simulate a browser-like environment
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.app.json", // TypeScript configuration
      },
    ],
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS modules
  },
};

export default config;
