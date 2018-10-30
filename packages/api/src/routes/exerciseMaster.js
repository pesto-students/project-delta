import { Router } from 'express';
import { asyncHandler } from '../services/asyncHandler';
import {
  getAllExerciseMaster,
  insertNewExercise,
  updateExerciseMaster,
  deleteExerciseMaster,
} from '../db/collections/exerciseMaster';

const exerciseMaster = Router();

exerciseMaster.get('/', asyncHandler(async (req, res) => {
  const exerciseList = await getAllExerciseMaster();
  return res.json({ exerciseList });
}));

exerciseMaster.post('/create', asyncHandler(async (req, res) => {
  const { data } = req.body;
  const newExercise = await insertNewExercise(data);
  return res.json({ newExercise });
}));

exerciseMaster.put('/:id', asyncHandler(async (req, res) => {
  const { data } = req.body;
  const { id } = req.params;
  await updateExerciseMaster(id, data);
  return res.json({ status: 'Success' });
}));

exerciseMaster.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  await deleteExerciseMaster(id);
  return res.json({ status: 'Success' });
}));

export { exerciseMaster };
