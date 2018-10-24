import { Router } from 'express';
import { Types } from 'mongoose';
import { asyncHandler } from '../services/asyncHandler';
import { getBatchTopics } from '../db/collections/batchTopics';
import { isAuthenticated } from '../helper/auth/isAuthenticated';

const ERR_MSGS = require('../../constants/ERR_MSGS');

const batchTopics = Router();

batchTopics.get('/list', isAuthenticated, asyncHandler(async (req, res) => {
  const { batchId, day } = req.query;
  if (!batchId || !day) {
    return res.status(400).json({ error: ERR_MSGS.missingInfo });
  } else if (!Types.ObjectId.isValid(batchId)) {
    return res.status(400).json({ error: ERR_MSGS.noBatchId });
  }

  const batchTopicsList = await getBatchTopics(batchId, day);
  return res.json({ batchTopicsList });
}));

export { batchTopics };
