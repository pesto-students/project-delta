import isAfter from 'date-fns/is_after';
import addDays from 'date-fns/add_days';
import { Router } from 'express';
import { asyncHandler } from '../services/asyncHandler';
import { getAllBatches, insertBatch } from '../db/collections/batch';

const ERR_MSGS = require('../../constants/ERR_MSGS');
const batchValidation = require('../services/validations/batchValidation');

const batchRoutes = Router();

batchRoutes.get('/list', asyncHandler(async (req, res, next) => {
  const batchList = await getAllBatches();
  const { filter } = req.query;
  // active filters the batchs which are ongoing
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
  if (!req.body) {
    res.status(400).json({ error: ERR_MSGS.noBatchData });
  }
  const { body } = req;
  const tempStartDate = new Date(body.startDate);
  body.endDate = addDays(tempStartDate, body.numberOfDays);
  if (!batchValidation(body).passed) {
    res.status(400).json({ error: batchValidation(body).msg });
  }
  const id = await insertBatch(body);
  res.json({ batch_created: 'Success', id });
  next();
}));

export { batchRoutes };
