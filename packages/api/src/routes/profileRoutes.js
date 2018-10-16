const profileRoutes = require('express').Router();
const { User } = require('../db');
const ERR_MSGS = require('../../constants/ERR_MSGS');
const profileValidation = require('../services/profileValidation');

profileRoutes.post('/createUser', (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: ERR_MSGS.noProfileData });
  }
  const { body } = req;
  if (!profileValidation(body).passed) {
    return res.status(400).json({ error: profileValidation(body).msg });
  }
  body.batchId = body.batchId.toString();
  const user = new User(body);
  return user.save()
    .then((doc) => {
      if (!doc || doc.length === 0) {
        return res.status(500).json({ error: ERR_MSGS.internalServerError });
      }
      return res.status(201).json({ user_created: 'Success', user_email: doc.email });
    })
    .catch((err) => {
      res.status(500).json({ error: `Database: ${err.errmsg}` });
    });
});

module.exports = profileRoutes;
