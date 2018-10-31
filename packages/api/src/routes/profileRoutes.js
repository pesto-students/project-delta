const profileRoutes = require('express').Router();
const { User, Batch } = require('../db');
const ERR_MSGS = require('../../constants/ERR_MSGS');
const profileValidation = require('../services/profileValidation');
const { isAuthenticated } = require('../helper/auth/isAuthenticated');
const { extractUser } = require('../helper/user');

profileRoutes.get('/:id?', isAuthenticated, extractUser, async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  if (!id || id.toLowerCase() !== 'me') {
    return res.status(400).end();
  }
  if (!user) {
    res.status(400).json({ error: ERR_MSGS.profileNotExist });
  }
  const {
    email, firstName, lastName, profilePicUrl, batchId, role,
  } = user;
  if (id.toLowerCase() !== 'me') {
    return res.status(400).end();
  }
  if (role === 'instructor') {
    return res.json(user);
  }
  // id = me and role = student
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
  return res.json(finalUserDetails);
});

profileRoutes.post('/:id?', isAuthenticated, extractUser, async (req, res) => {
  const { id } = req.params;
  if (id && id.toLowerCase() !== 'me') {
    return res.send(400).end();
  }
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
  if (!req.user) {
    const user = new User(body);
    const result = await user.save();
    return res.send(result);
  }
  const result = await User.updateOne({ email: req.user.email }, body, { upsert: true });
  return res.send(result);
});

module.exports = profileRoutes;
