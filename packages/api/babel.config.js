module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '9',
        },
      },
    ],
  ],
  ignore: ['node_modules', 'build'],
};
