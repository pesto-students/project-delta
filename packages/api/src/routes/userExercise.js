/*  eslint no-param-reassign: ["error", { "props": false }] */
// Above rule is because we need to assign some properties the object
import { Router } from 'express';
import { asyncHandler } from '../services/asyncHandler';
import {
  insertUserExercises,
  getExerciseRatingReport,
} from '../db/collections/userExercise';
import { isAuthenticated } from '../helper/auth/isAuthenticated';
import { extractUser } from '../helper/user';

const userExercise = Router();

userExercise.post('/create', isAuthenticated, extractUser, asyncHandler(async (req, res) => {
  /* req.body mock
  * [ { batchExerciseId, batchExerciseName, isCompleted },
  *   { batchExerciseId, batchExerciseName, isCompleted },
  *   { batchExerciseId, batchExerciseName, isCompleted },
  * ]
  */
  const userSubmittedExercises = req.body;
  userSubmittedExercises.forEach((exercise) => {
    exercise.userId = req.user._id;
    exercise.userFirstName = req.user.firstName;
  });
  const newExercises = await insertUserExercises(userSubmittedExercises);
  return res.json({ newExercises });
}));

userExercise.get('/report', isAuthenticated, extractUser, asyncHandler(async (req, res) => {
  const { batchId, day } = req;
  const report = await getExerciseRatingReport(batchId, day);
  return res.json({ report });
}));

export { userExercise };
