import { Router } from 'express';
import { asyncHandler } from '../services/asyncHandler';
import { getAllBatches } from '../db/collections/batch';

const batchRoutes = Router();

batchRoutes.post('/list', asyncHandler(async (req, res, next) => {
  const batchList = await getAllBatches();
  res.json({ batchList });
  next();
}));

export { batchRoutes };
