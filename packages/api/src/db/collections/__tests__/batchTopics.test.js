import mongoose from 'mongoose';
import { DB_URL } from '../../../../config';

import { getBatchTopics, insertBatchTopics } from '../batchTopics';
import { BatchTopic } from '../../index';

describe('Mongo Queries: Batch', () => {
  const dummyTopics = [
    {
      name: 'rebase',
      category: 'git',
      day: 1,
      batchId: mongoose.Types.ObjectId('111111111111111111111111'),
    },
    {
      name: 'merge',
      category: 'git',
      day: 1,
      batchId: mongoose.Types.ObjectId('111111111111111111111122'),
    },
    {
      name: 'PR',
      category: 'git',
      day: 2,
      batchId: mongoose.Types.ObjectId('111111111111111111111133'),
    },
    {
      name: 'extra',
      category: 'misc',
      day: 4,
      batchId: mongoose.Types.ObjectId('111111111111111111111133'),
    },
  ];

  beforeAll(async () => {
    mongoose.connect(DB_URL, { useNewUrlParser: true, connectTimeoutMS: 10000 });
    await BatchTopic.insertMany(dummyTopics);
  });

  afterAll(async () => {
    await BatchTopic.remove({});
    await mongoose.disconnect();
  });

  describe('GET /dashboard/batchTopics/', () => {
    it('should return all topics documents when no argument i.e. day is passed', async () => {
      const topicsList = await getBatchTopics();
      expect(topicsList.length).toBe(dummyTopics.length);
    });
    it('should return topics on a particular day passed as an argument', async () => {
      const batchList = await getBatchTopics(4);
      expect(batchList[0].name).toBe('extra');
    });
  });

  describe('POST /dashboard/batchTopics/', () => {
    const newDocument = {
      name: 'store',
      category: 'react',
      day: 14,
      batchId: mongoose.Types.ObjectId('111111111111111111114321'),
    };

    afterEach(async () => {
      await BatchTopic.remove({ batchNumber: newDocument.batchNumber });
    });

    it('should insert new document', async () => {
      await insertBatchTopics(newDocument);

      const batch = BatchTopic.findOne({ batchNumber: newDocument.batchNumber });
      expect(batch).toBeDefined();
    });

    it('should return new document id', async () => {
      const newId = await insertBatchTopics(newDocument);

      const batch = BatchTopic.findOne({ _id: newId });
      expect(batch).toBeDefined();
    });
  });
});
