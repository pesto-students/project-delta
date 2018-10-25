import mongoose from 'mongoose';
import { DB_URL } from '../../../../config';

import { getAllExercise } from '../batchExercise';
import { BatchExercise } from '../../index';

describe('Mongo Queries: Batch Exercises', () => {
  const dummyBatchExercise = [
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111111'),
      name: 'Rebase',
      batchTopicId: mongoose.Types.ObjectId('111111111111111111111111'),
    },
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111112'),
      name: 'Merge',
      batchTopicId: mongoose.Types.ObjectId('111111111111111111111112'),
    },
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111111'),
      name: 'Conflict',
      batchTopicId: mongoose.Types.ObjectId('111111111111111111111113'),
    },
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111111'),
      name: 'extra',
      batchTopicId: mongoose.Types.ObjectId('111111111111111111111114'),
    },
  ];

  beforeAll(async () => {
    mongoose.connect(DB_URL, { useNewUrlParser: true, connectTimeoutMS: 10000 });
    await BatchExercise.insertMany(dummyBatchExercise);
  });

  afterAll(async () => {
    await BatchExercise.deleteMany({});
    await mongoose.disconnect();
  });

  describe('get batches', () => {
    it('should return batch exercises with matching batch id', async () => {
      const batchTopicsList = await getAllExercise('111111111111111111111111');
      expect(batchTopicsList.length).toBe(3);
    });
  });
});
