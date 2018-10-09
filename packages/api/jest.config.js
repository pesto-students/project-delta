module.exports = {
  verbose: true,
  collectCoverageFrom: [
    'src/**/*',
  ],
  transform: {
    '.js$': 'babel-jest',
  },
};
