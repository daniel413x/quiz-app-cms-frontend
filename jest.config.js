export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.node.json",
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "node_modules/ts-jest-mock-import-meta",
              options: {
                metaObjectReplacement: {
                  env: {
                    VITE_APP_API_URL: "placeholder",
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg|module.css)$": "<rootDir>/src/test/__mocks__/fileMock.js",
    '^@/(.*)': '<rootDir>/src/$1'
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "json", "text"],
  coveragePathIgnorePatterns: ["/node_modules/"],
};
