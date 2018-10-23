import mongoose from 'mongoose';
import { DB_URL } from '../../../../config';

import { getBatchTopics } from '../batchTopics';
import { BatchTopic } from '../../index';

describe('Mongo Queries: Batch Topics', () => {
  const dummyBatchTopics = [
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111111'),
      name: 'Rebase',
      category: 'git',
      day: 1,
    },
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111111'),
      name: 'Merge',
      category: 'git',
      day: 1,
    },
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111111'),
      name: 'Conflict',
      category: 'git',
      day: 1,
    },
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111112'),
      name: 'ExtraTerrestrial',
      category: 'unreal',
      day: 1,
    },
  ];

  beforeAll(async () => {
    mongoose.connect(DB_URL, { useNewUrlParser: true, connectTimeoutMS: 10000 });
    await BatchTopic.insertMany(dummyBatchTopics);
  });

  afterAll(async () => {
    await BatchTopic.deleteMany({});
    await mongoose.disconnect();
  });

  describe('get batches', () => {
    it('should return all batch documents with matching batch id', async () => {
      const batchTopicsList = await getBatchTopics('111111111111111111111111', 1);
      expect(batchTopicsList.length).toBe(3);
    });
  });
});
