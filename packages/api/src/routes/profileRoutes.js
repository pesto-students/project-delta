const profileRoutes = require('express').Router();
const winston = require('winston');
const { User } = require('../db');
const ERR_MSGS = require('../../constants/ERR_MSGS');
const profileValidation = require('../services/profileValidation');
const { isAuthenticated } = require('../helper/auth/isAuthenticated');

profileRoutes.post('/createUser', isAuthenticated, (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: ERR_MSGS.noProfileData });
  }
  const { body } = req;
  if (!profileValidation(body).passed) {
    return res.status(400).json({ error: profileValidation(body).msg });
  }
  if (body.role === 'student') {
    body.batchId = body.batchId.toString();
  }
  const user = new User(body);
  return user.save()
    .then((doc) => {
      if (!doc || doc.length === 0) {
        winston.error(`!DB- From: ${req.ip} - ${req.method} - ${req.originalUrl} - Error: Unable to create document`);
        return res.status(500).json({ error: ERR_MSGS.internalServerError });
      }
      return res.status(201).json({ user_created: 'Success', user_email: doc.email });
    })
    .catch(() => {
      res.status(500).json({ error: ERR_MSGS.duplicateKeyError });
    });
});

module.exports = profileRoutes;
