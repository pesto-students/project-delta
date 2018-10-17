const fs = require('fs');
const path = require('path');

module.exports = fs.readdirSync(__dirname)
  .filter(name => fs.statSync(path.join(__dirname, name)).isDirectory())
  .filter(name => /-util$/.test(name))
  .reduce((acc, name) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    acc[name.split('-')[0]] = require(path.join(__dirname, name));
    return acc;
  }, {});
