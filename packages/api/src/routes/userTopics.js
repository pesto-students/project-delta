import { Router } from 'express';
import { asyncHandler } from '../services/asyncHandler';
import {
  insertUserTopic,
  getUserTopics,
} from '../db/collections/userTopics';
import { isAuthenticated } from '../helper/auth/isAuthenticated';
import { extractUser } from '../helper/user';

const userTopic = Router();

userTopic.get('/list', isAuthenticated, extractUser, asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userTopicList = await getUserTopics(userId);
  return res.json({ userTopicList });
}));

userTopic.post('/create', isAuthenticated, extractUser, asyncHandler(async (req, res) => {
  const data = {
    userId: req.user._id,
    userFirstName: req.user.firstName,
    ...req.body,
  };
  const newTopic = await insertUserTopic(data);
  return res.json({ newTopic });
}));

export { userTopic };
