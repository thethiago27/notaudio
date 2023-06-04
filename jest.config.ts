import type { JestConfigWithTsJest } from "ts-jest";
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.paths.json";

export default {
  preset: "ts-jest",
  reporters: ["default"],
  collectCoverageFrom: ["src/**/*.ts", "!/node_modules/"],
  coverageReporters: ["cobertura", "html"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/"
  }),
  testMatch: ["**/?(*.)+(spec|test).+(ts|js)"],
  coveragePathIgnorePatterns: [
    "index.ts",
    "node_modules",
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
} as JestConfigWithTsJest;
