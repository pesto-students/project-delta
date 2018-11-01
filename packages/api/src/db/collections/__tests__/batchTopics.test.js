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
      archive: false,
      masterId: mongoose.Types.ObjectId('master_id_01'),
    },
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111111'),
      name: 'Merge',
      category: 'git',
      day: 2,
      archive: false,
      masterId: mongoose.Types.ObjectId('master_id_02'),
    },
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111111'),
      name: 'Conflict',
      category: 'git',
      day: 1,
      archive: false,
      masterId: mongoose.Types.ObjectId('master_id_03'),
    },
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111112'),
      name: 'ExtraTerrestrial',
      category: 'unreal',
      day: 1,
      archive: false,
      masterId: mongoose.Types.ObjectId('master_id_04'),
    },
  ];

  beforeAll(async () => {
    await mongoose.connect(DB_URL, { useNewUrlParser: true, connectTimeoutMS: 10000 });
    await BatchTopic.insertMany(dummyBatchTopics);
  });

  afterAll(async () => {
    await BatchTopic.deleteMany({});
    await mongoose.disconnect();
  });

  describe('get batch Topics', () => {
    it('should return all documents with matching `batch id`', async () => {
      const topicId = '111111111111111111111111';
      const batchTopicsList = await getBatchTopics(topicId);

      expect(batchTopicsList.length).toBe(3);
    });

    it('should return all documents with matching `batch id` and `day`', async () => {
      const topicId = '111111111111111111111111';
      const day = 1;
      const batchTopicsList = await getBatchTopics(topicId, day);

      expect(batchTopicsList.length).toBe(2);
    });
  });
});
