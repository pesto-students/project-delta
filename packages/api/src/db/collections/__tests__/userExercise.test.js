import mongoose from 'mongoose';
import { DB_URL } from '../../../../config';

import {
  insertUserExercises,
  getExerciseRatingReport,
} from '../userExercise';
import { UserExercise } from '../../index';

describe('Mongo Queries: Topics Master', () => {
  const dummyUserExercise = [
    {
      userId: mongoose.Types.ObjectId('111111111111111111111111'),
      userFirstName: 'Vipul',
      batchExerciseId: mongoose.Types.ObjectId('111111111111111111111112'),
      batchExerciseName: 'Git',
      batchExerciseDay: 2,
      batchTopicId: mongoose.Types.ObjectId('111111111111111111111112'),
      batchTopicName: 'Git',
      batchId: mongoose.Types.ObjectId('111111111111111111111119'),
      isCompleted: false,
    },
    {
      userId: mongoose.Types.ObjectId('111111111111111111111111'),
      userFirstName: 'Vipul',
      batchExerciseId: mongoose.Types.ObjectId('111111111111111111111114'),
      batchExerciseName: 'Todo',
      batchTopicId: mongoose.Types.ObjectId('111111111111111111111114'),
      batchTopicName: 'Javascript',
      batchExerciseDay: 3,
      isCompleted: false,
      batchId: mongoose.Types.ObjectId('111111111111111111111119'),
    },
  ];

  beforeAll(async () => {
    await mongoose.connect(DB_URL, { useNewUrlParser: true, connectTimeoutMS: 10000 });
    await UserExercise.insertMany(dummyUserExercise);
  });

  afterAll(async () => {
    await UserExercise.deleteMany({});
    await mongoose.disconnect();
  });

  describe('New user exercise', () => {
    const newUserExercises = [{
      userId: mongoose.Types.ObjectId('111111111111111111211321'),
      userFirstName: 'Alien',
      batchExerciseId: mongoose.Types.ObjectId('111111141111143111111112'),
      batchExerciseName: 'Machine Code',
      batchExerciseDay: 2,
      batchTopicId: mongoose.Types.ObjectId('111111111111111111111114'),
      batchTopicName: 'Javascript',
      batchId: mongoose.Types.ObjectId('111111111111111111111119'),
      isCompleted: true,
    },
    {
      userId: mongoose.Types.ObjectId('111111114111111111211321'),
      userFirstName: 'Human',
      batchExerciseId: mongoose.Types.ObjectId('211111141111143111111112'),
      batchExerciseName: 'English',
      batchTopicId: mongoose.Types.ObjectId('111111111111111111111112'),
      batchTopicName: 'Generic',
      batchExerciseDay: 3,
      batchId: mongoose.Types.ObjectId('111111111111111111111119'),
      isCompleted: false,
    },
    ];
    it('should insert new user exercises', async () => {
      const addedExercises = await insertUserExercises(newUserExercises);
      const exercise = await UserExercise.findOne({ userId: '111111111111111111211321' });
      expect(exercise).toBeDefined();
      expect(addedExercises.length).toBe(2);
    });
    // This means that it is only one time submission
    it('should not alter already filled exercise', async () => {
      const duplicateEntry = {
        userId: mongoose.Types.ObjectId('111111111111111111211321'),
        userFirstName: 'Alien',
        batchExerciseId: mongoose.Types.ObjectId('111111141111143111111112'),
        batchExerciseName: 'Machine Code',
        batchExerciseDay: 2,
        batchTopicId: mongoose.Types.ObjectId('111111111111111111111114'),
        batchTopicName: 'Javascript',
        batchId: mongoose.Types.ObjectId('111111111111111111111119'),
        isCompleted: false, // user should not be able to uncheck any checked exercise
      };
      try {
        await insertUserExercises([duplicateEntry]);
      } catch (e) {
        expect(e.code).toBe(11000); // 11000 is a dup key error from db Frontend will receive 500
      }
    });
  });

  describe('User Exercise Report', () => {
    it('should return documents with `completedCount`, `users`', async () => {
      const batchId = mongoose.Types.ObjectId('111111111111111111111119');
      const day = 2;
      const report = await getExerciseRatingReport(batchId, day);
      expect(report[0].users).toBeDefined();
      expect(report[0].completedCount).toBeDefined();
    });

    it('should return empty array when day is not specified', async () => {
      const batchId = mongoose.Types.ObjectId('111111111111111111111119');
      const report = await getExerciseRatingReport(batchId);
      expect(report.length).toBe(0);
    });
  });
});
