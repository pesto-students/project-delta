import mongoose from 'mongoose';
import { DB_URL } from '../../../../config';
import {
  getAllExerciseMaster,
  insertNewExercise,
  updateExerciseMaster,
  deleteExerciseMaster,
} from '../exerciseMaster';
import { ExerciseMaster } from '../../index';

describe('Mongo Queries: Exercise Master', () => {
  const dummyMasterExercise = [
    {
      name: 'Exercise 1',
      topicId: mongoose.Types.ObjectId('121212121212121212121212'),
    },
    {
      name: 'Exercise 2',
      topicId: mongoose.Types.ObjectId('121212121212121212121213'),
    },
    {
      name: 'Exercise 3',
      topicId: mongoose.Types.ObjectId('121212121212121212121214'),
    },
    {
      name: 'Exercise 4',
      topicId: mongoose.Types.ObjectId('121212121212121212121215'),
    },
  ];

  beforeAll(async () => {
    await mongoose.connect(DB_URL, { useNewUrlParser: true, connectTimeoutMS: 10000 });
    await ExerciseMaster.insertMany(dummyMasterExercise);
  });

  afterAll(async () => {
    await ExerciseMaster.deleteMany({});
    await mongoose.disconnect();
  });

  describe('Get Exercises master', () => {
    it('should return all exercises', async () => {
      const exerciseList = await getAllExerciseMaster();
      expect(exerciseList.length).toBe(4);
    });
  });

  describe('New Exercise master', () => {
    const newExercise = {
      name: 'Newest Exercise 1',
      topicId: mongoose.Types.ObjectId('121212121212121212121215'),
    };

    afterEach(async () => {
      await ExerciseMaster.deleteOne(newExercise);
    });

    it('should insert new exercise', async () => {
      await insertNewExercise(newExercise);

      const exercise = await ExerciseMaster.findOne(newExercise);
      expect(exercise).toBeDefined();
    });

    it('should return inserted document', async () => {
      const insertedDocument = await insertNewExercise(newExercise);

      const exercise = await ExerciseMaster.findOne({ _id: insertedDocument._id });
      expect(exercise).toBeDefined();
    });
  });

  describe('Update exercise master', () => {
    const newExercise = {
      name: 'Update Exercise 1',
      topicId: mongoose.Types.ObjectId('121212121212121212121218'),
    };

    beforeEach(async () => {
      const insertedDocument = await insertNewExercise(newExercise);
      newExercise._id = insertedDocument._id;
    });

    afterEach(async () => {
      await ExerciseMaster.deleteOne(newExercise);
    });

    it('should update document to new value', async () => {
      const newData = {
        name: 'Super updated Name',
      };
      await updateExerciseMaster(newExercise._id, newData);

      const exercise = await ExerciseMaster.findOne(newData);
      expect(exercise).toBeDefined();
    });
  });

  describe('Delete Exercise Master', () => {
    const newExercise = {
      name: 'Deletion Exercise 1',
      topicId: mongoose.Types.ObjectId('121212121212121212121215'),
    };

    beforeEach(async () => {
      const insertedDocument = await insertNewExercise(newExercise);
      newExercise._id = insertedDocument._id;
    });

    afterEach(async () => {
      await ExerciseMaster.deleteOne(newExercise);
    });

    it('should delete exercise', async () => {
      await deleteExerciseMaster(newExercise._id);
      const exercise = await ExerciseMaster.findOne(newExercise);
      expect(exercise).toBe(null);
    });
  });
});
