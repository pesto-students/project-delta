import { BatchExercise } from '../index';

const getAllExercise = async (batchId, day) => {
  const projection = {
    name: 1,
    batchTopicId: 1,
    batchTopicName: 1,
    day: 1,
  };
  const query = {
    batchId,
    archive: false,
  };

  if (day) {
    query.day = day;
  }
  const exerciseList = await BatchExercise.find(query, projection);
  return exerciseList;
};

export { getAllExercise };
