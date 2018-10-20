import { Router } from 'express';
import { asyncHandler } from '../../services/asyncHandler';
import { getBatchTopics, insertBatchTopics } from '../../db/collections/batchTopics';
import { isAuthenticated } from '../../helper/auth/isAuthenticated';

const batchTopicRoutes = Router();

batchTopicRoutes.get('/', isAuthenticated, asyncHandler(async (req, res, next) => {
  const topicsList = await getBatchTopics();
  res.json({ topicsList });
  next();
}));
batchTopicRoutes.get('/:day', isAuthenticated, asyncHandler(async (req, res, next) => {
  const topicsList = await getBatchTopics(req.params.day);
  res.json({ topicsList });
  next();
}));
batchTopicRoutes.post('/', isAuthenticated, asyncHandler(async (req, res, next) => {
  const result = await insertBatchTopics();
  res.json({ result });
  next();
}));

export { batchTopicRoutes };
