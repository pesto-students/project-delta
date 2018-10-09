import isEmail from 'validator/lib/isEmail';

const routes = require('express').Router();
const winston = require('winston');

const config = require('../../config');
const tokenService = require('../services/token');
const mailService = require('../services/mail');
const models = require('../db');

// Checks that the user who sent the request has a valid token
// If authenticated, the decoded token is made available to next middleware at req.decoded
// else, a 400 response is returned, and the next middleware is not called
function isAuthenticated(req, res, next) {
  const token = req.headers.Authorization || req.query.token
    || req.cookies.token || req.body.token;
  if (!token) {
    res.status(400).json({ error: 'TOKEN_MISSING' });
  } else {
    tokenService.decode(token)
      .then((decoded) => {
        req.decoded = decoded;
        next();
      })
      .catch(e => res.status(400).json({
        error: e.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID',
      }));
  }
}

routes.post('/generateToken', (req, res) => {
  if (!Reflect.has(req.body, 'email')) {
    res.status(400).json({ error: 'EMAIL_MISSING' });
  } else if (typeof req.body.email !== 'string' || !isEmail(req.body.email)) {
    res.status(400).json({ error: 'EMAIL_INVALID' });
  } else {
    const { email } = req.body;
    tokenService.generate({
      email,
      tokenType: 'EMAIL_VERIFICATION',
    }, config.EMAIL_VERIFICATION_TOKEN_EXPIRY)
      .then(token => mailService.sendMail(email, token))
      .then(() => res.json({ tokenStatus: 'success', email }))
      .catch((e) => {
        winston.error(`From: ${req.ip} - ${req.method} - ${req.originalUrl} -${e.message} - {tokenStatus: failed}`);
        res.status(500).json({ tokenStatus: 'failed' });
      });
  }
});

routes.post('/verifyToken', isAuthenticated, (req, res) => {
  const { email, tokenType } = req.decoded;
  if (tokenType === 'EMAIL_VERIFICATION') {
    // give the user a longer-lived token that can be used for future auto-login
    tokenService.generate({ email, tokenType: 'LOGIN' }, config.LOGIN_TOKEN_EXPIRY)
      .then((generatedToken) => {
        res.cookie('token', generatedToken, {
          // not adding a maxAge property to the cookie causes it to be
          //   deleted by the browser at the end of the session
          maxAge: config.LOGIN_COOKIE_EXPIRY,
        });
        return models.User.findOne({ email });
      })
      .then((user) => {
        res.json({
          authentication: 'success',
          isNewUser: user === null,
        });
      })
      .catch(() => {
        // TODO: error logging
        res.status(500).json({ error: 'Server error' });
      });
  } else if (tokenType === 'LOGIN') {
    // user already has a login token, so just acknowledge the sign-in
    res.json({
      authentication: 'success',
      isNewUser: false,
    });
  } else {
    // We sent a token containing invalid data to the user
    winston.error(`!IMP: From: ${req.ip} - ${req.method} - ${req.originalUrl} - User Email: ${email}`);
    res.status(400).json({ error: 'TOKEN_INVALID' });
  }
});

module.exports = routes;
