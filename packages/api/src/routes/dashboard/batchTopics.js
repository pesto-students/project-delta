import { Router } from 'express';
import { asyncHandler } from '../../services/asyncHandler';
import { getBatchTopics, insertBatchTopics } from '../../db/collections/batchTopics';

const batchTopicRoutes = Router();

batchTopicRoutes.get('/', asyncHandler(async (req, res, next) => {
  const topicsList = await getBatchTopics();
  res.json({ topicsList });
  next();
}));

batchTopicRoutes.post('/', asyncHandler(async (req, res, next) => {
  const result = await insertBatchTopics();
  res.json({ result });
  next();
}));

export { batchTopicRoutes };
