import isAfter from 'date-fns/is_after';
import addDays from 'date-fns/add_days';
import { Router } from 'express';
import { asyncHandler } from '../services/asyncHandler';
import { getAllBatches, insertBatch } from '../db/collections/batch';

const batchRoutes = Router();

batchRoutes.get('/list', asyncHandler(async (req, res, next) => {
  const batchList = await getAllBatches();
  const { filter } = req.query;
  if (filter === 'active') {
    const activeBatches = batchList.filter((batch) => {
      const date = new Date(batch.endDate);
      return isAfter(date, Date.now());
    });
    res.json({ activeBatches });
  } else {
    res.json({ batchList });
  }
  next();
}));

batchRoutes.post('/addNewBatch', asyncHandler(async (req, res, next) => {
  const { body } = req;
  const tempStartDate = new Date(body.startDate);
  body.endDate = addDays(tempStartDate, body.numberOfDays);
  // TODO body validation
  const id = await insertBatch(body);
  res.json({ id });
  next();
}));

export { batchRoutes };
