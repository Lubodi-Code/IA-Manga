module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.js',
    '!src/**/index.js',
  ],
  reporters: ['default', 'jest-junit'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};