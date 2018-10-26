import { Router } from 'express';
import { asyncHandler } from '../services/asyncHandler';
import {
  getAllMasterTopics,
  insertMasterTopic,
  updateMasterTopic,
  deleteMasterTopic,
} from '../db/collections/topicsMaster';

const topicMaster = Router();

topicMaster.get('/', asyncHandler(async (req, res) => {
  const topicList = await getAllMasterTopics();
  return res.json({ topicList });
}));

topicMaster.post('/create', asyncHandler(async (req, res) => {
  const { data } = req.body;
  const newTopic = await insertMasterTopic(data);
  return res.json({ newTopic });
}));

topicMaster.put('/:id', asyncHandler(async (req, res) => {
  const { data } = req.body;
  const { id } = req.params;
  await updateMasterTopic(id, data);
  return res.json({ status: 'success' });
}));

topicMaster.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  await deleteMasterTopic(id);
  return res.json({ status: 'success' });
}));

export { topicMaster };
