module.exports = {
  PORT: 5000,
  EMAIL_VERIFICATION_TOKEN_EXPIRY: 15 * 60, // 15 minutes
  LOGIN_TOKEN_EXPIRY: '28d',
  LOGIN_COOKIE_EXPIRY: 4 * 7 * 24 * 60 * 60 * 1000, // 4 weeks
  ...process.env,
};
