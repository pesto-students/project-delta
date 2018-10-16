import isEmail from 'validator/lib/isEmail';

const profileRoutes = require('express').Router();
const { User } = require('../db');
const ERR_MSGS = require('../../constants/ERR_MSGS');

profileRoutes.post('/saveData', (req, res) => {
  if (!Reflect.has(req.body, 'email')) {
    res.status(400).json({ error: ERR_MSGS.missingEmail });
  } else if (typeof req.body.email !== 'string' || !isEmail(req.body.email)) {
    res.status(400).json({ error: ERR_MSGS.invalidEmail });
  }
  req.body.email = req.body.email.toLowerCase().trim();
  const newUser = new User();
  newUser.save((err, user) => { // eslint-disable-line
    if (err) {
      res.status(400).json({ error: 'Cannot save the user' });
    }
    res.status(200).json({ profileRoute: 'success', user: req.body.firstName });
  });
});

module.exports = profileRoutes;
