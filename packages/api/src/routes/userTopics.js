/*  eslint no-param-reassign: ["error", { "props": false }] */
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
  /* req.body mock
  * [ { batchTopicId, batchTopicName, rating},
  *   { batchTopicId, batchTopicName, rating},
  *   { batchTopicId, batchTopicName, rating},
  * ]
  */
  const userSubmittedTopics = req.body;
  userSubmittedTopics.forEach((topic) => {
    topic.userId = req.user._id;
    topic.userFirstName = req.user.firstName;
  });

  const newTopics = await insertUserTopic(userSubmittedTopics);
  return res.json({ newTopics });
}));

export { userTopic };
