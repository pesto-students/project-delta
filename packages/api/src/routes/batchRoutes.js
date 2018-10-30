import isAfter from 'date-fns/is_after';
import { Router } from 'express';
import { asyncHandler } from '../services/asyncHandler';
import { getAllBatches, insertBatch } from '../db/collections/batch';

const batchRoutes = Router();

batchRoutes.get('/list', asyncHandler(async (req, res) => {
  const batchList = await getAllBatches();
  const { filter } = req.query;
  if (filter === 'active') {
    const currentDate = new Date();
    const activeBatches = batchList.filter(batch => isAfter(batch.endDate, currentDate));
    res.json({ activeBatches });
  } else {
    res.json({ batchList });
  }
}));

batchRoutes.post('/create', asyncHandler(async (req, res, next) => {
  const { body } = req;
  const result = await insertBatch(body);
  res.json({ batch_created: 'Success', batch_id: result.batchId, batchTopicsLength: result.batchTopicsLength });
  next();
}));

export { batchRoutes };
