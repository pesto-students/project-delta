import mongoose from 'mongoose';
import { DB_URL } from '../../../../config';

import { getAllExercise } from '../batchExercise';
import { BatchExercise } from '../../index';

describe('Mongo Queries: Batch Exercises', () => {
  const dummyBatchExercise = [
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111111'),
      name: 'Exercise 1',
      batchTopicId: mongoose.Types.ObjectId('121212121212121212121212'),
      batchTopicName: 'Git',
      day: 4,
      archive: false,
      masterId: mongoose.Types.ObjectId('master_id_01'),
    },
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111111'),
      name: 'Exercise 2',
      batchTopicId: mongoose.Types.ObjectId('121212121212121212121215'),
      batchTopicName: 'Javascript',
      day: 2,
      archive: false,
      masterId: mongoose.Types.ObjectId('master_id_02'),
    },
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111111'),
      name: 'Exercise 3',
      batchTopicId: mongoose.Types.ObjectId('121212121212121212121212'),
      batchTopicName: 'Git',
      day: 4,
      archive: false,
      masterId: mongoose.Types.ObjectId('master_id_03'),
    },
    {
      batchId: mongoose.Types.ObjectId('111111111111111111111112'),
      name: 'Exercise 4',
      batchTopicId: mongoose.Types.ObjectId('121212121212121212121215'),
      batchTopicName: 'Javascript',
      day: 2,
      archive: false,
      masterId: mongoose.Types.ObjectId('master_id_04'),
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

  describe('get batch exercises', () => {
    it('should return all documents with matching `batch id`', async () => {
      const topicId = '111111111111111111111111';
      const batchTopicsList = await getAllExercise(topicId);

      expect(batchTopicsList.length).toBe(3);
    });

    it('should return all documents with matching `batch id` and `day`', async () => {
      const topicId = '111111111111111111111111';
      const day = 2;
      const batchTopicsList = await getAllExercise(topicId, day);

      expect(batchTopicsList.length).toBe(1);
    });
  });
});
