import { Router } from 'express';
import { Types } from 'mongoose';
import { asyncHandler } from '../services/asyncHandler';
import { getBatchTopics, deleteBatchTopic } from '../db/collections/batchTopics';
import { isAuthenticated } from '../helper/auth/isAuthenticated';
import { missingInfo, noBatchId } from '../../constants/ERR_MSGS';

const batchTopics = Router();

batchTopics.get('/list', isAuthenticated, asyncHandler(async (req, res) => {
  const { batchId, day } = req.query;
  if (!batchId) {
    return res.status(400).json({ error: missingInfo });
  }

  if (!Types.ObjectId.isValid(batchId)) {
    return res.status(400).json({ error: noBatchId });
  }

  const batchTopicsList = await getBatchTopics(batchId, day);
  return res.json({ batchTopicsList });
}));

batchTopics.delete('/:id', isAuthenticated, asyncHandler(async (req, res) => {
  const { id } = req.params;
  await deleteBatchTopic(id);
  return res.json({ status: 'success' });
}));

export { batchTopics };
