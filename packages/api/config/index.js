// The env var 'MODE' should be in ['PROD', 'DEV', 'CI']
const mode = process.env.MODE || 'DEV';
require('dotenv').load();
// eslint-disable-next-line import/no-dynamic-require
module.exports = require(`./${mode.toLowerCase()}`);
