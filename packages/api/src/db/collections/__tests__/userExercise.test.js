import mongoose from 'mongoose';
import { DB_URL } from '../../../../config';

import {
  insertUserExercises,
} from '../userExercise';
import { UserExercise } from '../../index';

describe('Mongo Queries: Topics Master', () => {
  const dummyUserExercise = [
    {
      userId: mongoose.Types.ObjectId('111111111111111111111111'),
      userFirstName: 'Vipul',
      batchExerciseId: mongoose.Types.ObjectId('111111111111111111111112'),
      batchExerciseName: 'Git',
      isCompleted: false,
    },
    {
      userId: mongoose.Types.ObjectId('111111111111111111111111'),
      userFirstName: 'Vipul',
      batchExerciseId: mongoose.Types.ObjectId('111111111111111111111114'),
      batchExerciseName: 'Todo',
      isCompleted: false,
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
      isCompleted: true,
    },
    {
      userId: mongoose.Types.ObjectId('111111114111111111211321'),
      userFirstName: 'Human',
      batchExerciseId: mongoose.Types.ObjectId('211111141111143111111112'),
      batchExerciseName: 'English',
      isCompleted: false,
    },
    ];
    it('should insert new user exerises', async () => {
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
        isCompleted: false, // user should not be able to uncheck any checked exercise
      };
      try {
        await insertUserExercises([duplicateEntry]);
      } catch (e) {
        expect(e.code).toBe(11000); // 11000 is a dup key error from db Frontend will recieve 500
      }
    });
  });
});
