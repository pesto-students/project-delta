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
  ignore: ['node_modules', 'build'],
};
