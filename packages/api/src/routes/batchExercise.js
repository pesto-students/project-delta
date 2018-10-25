import { Router } from 'express';
import { asyncHandler } from '../services/asyncHandler';
import { getAllExercise } from '../db/collections/batchExercise';
import { extractUser } from '../helper/user';
import { isAuthenticated } from '../helper/auth/isAuthenticated';

const batchExercise = Router();

batchExercise.get('/list', isAuthenticated, extractUser, asyncHandler(async (req, res) => {
  const { batchId } = req.user;
  const exerciseList = await getAllExercise(batchId);
  res.json({ exerciseList });
}));

export { batchExercise };
