// read vars from .env
// envConfig will be undefined if .env is not present
let envConfig = require('dotenv').config().parsed;

const requiredEnvVars = [
  'MODE',
  'DB_URL',
  'JWT_SECRET',
  'SENDGRID_API_KEY',
];

if (envConfig === undefined) {
  envConfig = {};
  requiredEnvVars.forEach((ev) => {
    envConfig[ev] = process.env[ev];
  });
}

requiredEnvVars.forEach((ev) => {
  if (envConfig[ev] === undefined) {
    throw new Error(`Required environment variable ${ev} is missing!`);
  }
});

const allowedModes = ['DEV', 'CI', 'PROD'];
if (allowedModes.indexOf(envConfig.MODE) === -1) {
  throw new Error(`Environment variable 'MODE' must be one of ${allowedModes.join(', ')}`);
}

const commonConfig = {
  PORT: 5000,
  EMAIL_VERIFICATION_TOKEN_EXPIRY: 15 * 60, // 15 minutes
  LOGIN_TOKEN_EXPIRY: '28d',
  LOGIN_COOKIE_EXPIRY: 4 * 7 * 24 * 60 * 60 * 1000, // 4 weeks
};

module.exports = {
  ...commonConfig,
  // eslint-disable-next-line global-require, import/no-dynamic-require
  ...require(`./${envConfig.MODE.toLowerCase()}`),
  ...envConfig,
};
