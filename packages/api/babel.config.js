module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '8',
        },
      },
    ],
  ],
  ignore: ['node_modules', 'build'],
};
