import mongoose from 'mongoose';
import { DB_URL } from '../../../../config';

import {
  insertUserTopic, getUserTopics,
} from '../userTopics';
import { UserTopic } from '../../index';

describe('Mongo Queries: Topics Master', () => {
  const dummyUserTopics = [
    {
      userId: mongoose.Types.ObjectId('111111111111111111111111'),
      userFirstName: 'Vipul',
      batchTopicId: mongoose.Types.ObjectId('111111111111111111111112'),
      batchTopicName: 'Git',
      rating: 1,
    },
    {
      userId: mongoose.Types.ObjectId('111111111111111111111111'),
      userFirstName: 'Vipul',
      batchTopicId: mongoose.Types.ObjectId('111111111111111111111114'),
      batchTopicName: 'Git',
      rating: 10,
    },
  ];

  beforeAll(async () => {
    await mongoose.connect(DB_URL, { useNewUrlParser: true, connectTimeoutMS: 10000 });
    await UserTopic.insertMany(dummyUserTopics);
  });

  afterAll(async () => {
    await UserTopic.deleteMany({});
    await mongoose.disconnect();
  });

  describe('Get user topics', () => {
    it('should return batch exercises with matching user id', async () => {
      const userTopicsList = await getUserTopics('111111111111111111111111');
      expect(userTopicsList.length).toBe(2);
    });
  });
  describe('New user topic', () => {
    const newUserTopic = [{
      userId: mongoose.Types.ObjectId('111111111111111111211321'),
      userFirstName: 'Alien',
      batchTopicId: mongoose.Types.ObjectId('111111141111143111111112'),
      batchTopicName: 'React',
      rating: 7,
    },
    {
      userId: mongoose.Types.ObjectId('111111111111111111111123'),
      userFirstName: 'Vipul',
      batchTopicId: mongoose.Types.ObjectId('111111111111111111111156'),
      batchTopicName: 'Git Rebase',
      rating: 1,
    },
    {
      userId: mongoose.Types.ObjectId('111111111111111111111321'),
      userFirstName: 'Vipul',
      batchTopicId: mongoose.Types.ObjectId('111111111111143111111112'),
      batchTopicName: 'Git Merge',
      rating: 8,
    },
    ];

    it('should insert new user topics', async () => {
      const addedExercises = await insertUserTopic(newUserTopic);
      const topic = await UserTopic.findOne({ userId: '111111111111111111211321' });
      expect(topic).toBeDefined();
      expect(addedExercises.length).toBe(3);
    });

    it('should return inserted document', async () => {
      const insertedDocument = await insertUserTopic(newUserTopic);

      const topic = await UserTopic.findOne({ _id: insertedDocument._id });
      expect(topic).toBeDefined();
    });
  });
});
