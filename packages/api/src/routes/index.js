import isEmail from 'validator/lib/isEmail';

const routes = require('express').Router();
const winston = require('winston');

const config = require('../../config');
const tokenService = require('../services/token');
const mailService = require('../services/mail');
const ERR_MSGS = require('../../constants/ERR_MSGS');
const TOKEN_TYPES = require('../../constants/TOKEN_TYPES');
const { isAuthenticated } = require('../helper/auth/isAuthenticated');
const { extractUser } = require('../helper/user');

routes.post('/generateToken', (req, res) => {
  if (!req.header('origin')) {
    res.status(400).json({ error: ERR_MSGS.missingOriginHeader });
  } else if (!Reflect.has(req.body, 'email')) {
    res.status(400).json({ error: ERR_MSGS.missingEmail });
  } else if (typeof req.body.email !== 'string' || !isEmail(req.body.email)) {
    res.status(400).json({ error: ERR_MSGS.invalidEmail });
  } else {
    const { email } = req.body;
    tokenService.generate({
      email,
      tokenType: TOKEN_TYPES.emailToken,
    }, config.EMAIL_VERIFICATION_TOKEN_EXPIRY)
      .then(token => mailService.sendMail(email, token, req.headers.origin))
      .then(() => res.json({ tokenStatus: 'success', email }))
      .catch((e) => {
        winston.error(`From: ${req.ip} - ${req.method} - ${req.originalUrl} -${e.message} - {tokenStatus: failed}`);
        res.status(500).json({ tokenStatus: 'failed' });
      });
  }
});

routes.post('/verifyToken', isAuthenticated, extractUser, (req, res) => {
  const { email, tokenType } = req.decoded;
  const isNewUser = req.user === null;

  if (tokenType === TOKEN_TYPES.emailToken) {
    // give the user a longer-lived token that can be used for future auto-login
    tokenService.generate({ email, tokenType: TOKEN_TYPES.loginToken }, config.LOGIN_TOKEN_EXPIRY)
      .then((generatedToken) => {
        res.json({
          token: generatedToken,
          authentication: 'success',
          isNewUser,
          _id: isNewUser ? undefined : req.user._id,
          profilePicUrl: isNewUser ? undefined : req.user.profilePicUrl,
          email,
        });
      })
      .catch((e) => {
        winston.error(`From: ${req.ip} - ${req.method} - ${req.originalUrl} - Email: ${email} - Error: ${e.message}`);
        res.status(500).json({ error: ERR_MSGS.internalServerError });
      });
  } else if (tokenType === TOKEN_TYPES.loginToken) {
    // user already has a login token; we'll just pass it through
    res.json({
      token: req.token,
      authentication: 'success',
      isNewUser,
      _id: isNewUser ? undefined : req.user._id,
      profilePicUrl: isNewUser ? undefined : req.user.profilePicUrl,
      email,
    });
  } else {
    // We sent a token containing invalid data to the user
    winston.error(`!IMP: From: ${req.ip} - ${req.method} - ${req.originalUrl} - Email: ${email} - token: ${tokenType}`);
    res.status(400).json({ error: ERR_MSGS.invalidToken });
  }
});

module.exports = routes;
