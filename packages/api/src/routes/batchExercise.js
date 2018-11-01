import { Router } from 'express';
import { Types } from 'mongoose';

import { missingInfo, noBatchId } from '../../constants/ERR_MSGS';
import { getAllExercise } from '../db/collections/batchExercise';
import { isAuthenticated } from '../helper/auth/isAuthenticated';
import { extractUser } from '../helper/user';
import { asyncHandler } from '../services/asyncHandler';

const batchExercise = Router();

batchExercise.get('/list', isAuthenticated, extractUser, asyncHandler(async (req, res) => {
  const { batchId, day } = req.query;
  if (!batchId) {
    return res.status(400).json({ error: missingInfo });
  }

  if (!Types.ObjectId.isValid(batchId)) {
    return res.status(400).json({ error: noBatchId });
  }
  const exerciseList = await getAllExercise(batchId, day);
  return res.json({ exerciseList });
}));

export { batchExercise };
