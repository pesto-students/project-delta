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
  if (id.toLowerCase() !== 'me') {
    return res.status(400).end();
  }
  if (user.role === 'instructor') {
    return res.json(user);
  }
  // id = me and role = student
  const projection = {
    city: 1,
    batchNumber: 1,
  };
  const batchOfUser = await Batch.findOne({ batchId: user.batchId }, projection);
  const finalUserDetails = {
    ...user.toObject(),
    ...batchOfUser.toObject(),
  };
  return res.json(finalUserDetails);
});

profileRoutes.post('/:id?', isAuthenticated, extractUser, async (req, res) => {
  let { user } = req;
  const { id } = req.params;

  if (id && id.toLowerCase() !== 'me') {
    return res.send(400).end();
  }

  if (!req.body) {
    return res.status(400).json({ error: ERR_MSGS.noProfileData });
  }
  const { body } = req;
  if (!user) {
    user = new User(body);
  } else {
    Reflect.ownKeys(body).forEach((key) => {
      user[key] = body[key];
    });
  }
  const validationResult = await profileValidation(user);
  if (!validationResult.passed) {
    return res.status(400).json({ error: validationResult.msg });
  }

  try {
    await user.save();
  } catch (e) {
    return res.json({ success: false });
  }
  return res.json({ success: true });
});

module.exports = profileRoutes;
