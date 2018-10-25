import { BatchExercise } from '../index';

const getAllExercise = async (batchId) => {
  const projection = {
    name: 1,
    batchId: 1,
    batchTopicId: 1,
  };
  const exerciseList = await BatchExercise.find({ batchId }, projection);
  return exerciseList;
};

export { getAllExercise };
