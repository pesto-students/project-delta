module.exports = {
  verbose: true,
  collectCoverageFrom: [
    'src/**/*',
  ],
  setupFiles: [
    '<rootDir>/enzyme.config.js',
  ],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/../../node_modules/jest-css-modules',
  },
};
