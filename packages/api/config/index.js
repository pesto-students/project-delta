// read vars from .env
// envConfig will be undefined if .env is not present
let envConfig = require('dotenv').config().parsed;

const requiredEnvVars = [
  'MODE',
  'PORT',
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

const fifteenMins = 15 * 60;
const fourWeeksInMs = 4 * 7 * 24 * 60 * 60 * 1000;

const commonConfig = {
  EMAIL_VERIFICATION_TOKEN_EXPIRY: fifteenMins,
  LOGIN_TOKEN_EXPIRY: '28d',
  LOGIN_COOKIE_EXPIRY: fourWeeksInMs,
};

module.exports = {
  ...commonConfig,
  // eslint-disable-next-line global-require, import/no-dynamic-require
  ...require(`./${envConfig.MODE.toLowerCase()}`),
  ...envConfig,
};
