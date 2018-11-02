import { UserExercise } from '../index';

const insertUserExercises = async (exercises) => {
  const result = await UserExercise.insertMany(exercises);
  return result;
};

const getExerciseRatingReport = async (batchId, day) => {
  const report = await UserExercise.aggregate([
    { $match: { batchId, batchExerciseDay: day, isCompleted: true } },
    {
      $group: {
        _id: {
          exerciseId: '$batchExerciseId',
          exerciseName: '$batchExerciseName',
          topicName: '$batchTopicName',
        },
        users: { $push: { _id: '$userId', name: '$userFirstName', rating: '$rating' } },
        completedCount: {
          $sum: 1,
        },
      },
    },
  ]);
  return report;
};

export { insertUserExercises, getExerciseRatingReport };
