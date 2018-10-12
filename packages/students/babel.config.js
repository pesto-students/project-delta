module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 1%, last 2 versions, Firefox ESR',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    [
      '@babel/plugin-proposal-class-properties',
    ],
  ],
  ignore: ['node_modules', 'build'],
};
