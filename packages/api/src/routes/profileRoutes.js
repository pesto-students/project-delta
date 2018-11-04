const profileRoutes = require('express').Router();
const { ObjectId } = require('mongoose').Types;
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
    return res.status(404).json({ error: ERR_MSGS.profileNotExist });
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
    _id: 0, // need to explicitly mention that _id is *not* wanted...***
  };
  const batchOfUser = await Batch.findOne({ _id: ObjectId(user.batchId) }, projection);
  if (batchOfUser === null) {
    console.error(`User ${user._id} has invalid batchId`); // eslint-disable-line no-console
    return res.status(500).json({ error: ERR_MSGS.internalServerError });
  }

  const finalUserDetails = {
    ...user.toObject(),
    ...batchOfUser.toObject(), // ***... to prevent batch._id overwriting user._id here
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
  delete body._id;
  body.email = req.decoded.email; // can't let users change their email!

  if (!user) {
    user = new User(body);
  } else {
    Reflect.ownKeys(body).forEach((key) => {
      if (key === 'batchId') {
        user[key] = ObjectId(body[key]);
      } else {
        user[key] = body[key];
      }
    });
  }
  const validationResult = await profileValidation(user);
  if (!validationResult.passed) {
    return res.status(400).json({ error: validationResult.msg });
  }

  try {
    await user.save();
  } catch (e) {
    return res.status(500).json({ error: ERR_MSGS.internalServerError });
  }
  return res.json(user);
});

module.exports = profileRoutes;
