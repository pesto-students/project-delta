const profileRoutes = require('express').Router();
const { User, Batch } = require('../db');
const ERR_MSGS = require('../../constants/ERR_MSGS');
const profileValidation = require('../services/profileValidation');
const { isAuthenticated } = require('../helper/auth/isAuthenticated');
const { extractUser } = require('../helper/user');

profileRoutes.get('/user/:id', isAuthenticated, extractUser, async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  if (user) {
    const {
      email, firstName, lastName, profilePicUrl, batchId, role,
    } = user;
    if (id.toLowerCase() === 'me') {
      const projection = {
        city: 1,
        batchNumber: 1,
      };
      const batchOfUser = await Batch.findOne({ batchId: user.batchId }, projection);
      const { city, batchNumber } = batchOfUser;
      const finalUserDetails = {
        email,
        firstName,
        lastName,
        profilePicUrl,
        batchId,
        role,
        city,
        batchNumber,
      };
      res.json(finalUserDetails);
    }
    res.status(400);
  }
  res.status(400).json({ error: ERR_MSGS.profileNotExist });
});

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
        return res.status(500).json({ error: ERR_MSGS.internalServerError });
      }
      return res.status(201).json({ user_created: 'Success', user_email: doc.email });
    })
    .catch(() => {
      res.status(500).json({ error: ERR_MSGS.internalServerError });
    });
});

module.exports = profileRoutes;
