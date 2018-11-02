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
    '\\.(jpg|jpeg|png|gif)$': '<rootDir>/mocks/fileMock.js',
  },
};
