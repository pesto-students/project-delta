import { ExerciseMaster } from '../index';

const getAllExerciseMaster = async () => {
  const projection = {
    name: 1,
    topicId: 1,
    topicName: 1,
    day: 1,
  };
  const query = {
    archive: false,
  };
  const exerciseList = await ExerciseMaster.find(query, projection);
  return exerciseList;
};

const insertNewExercise = async (excersiseDetail) => {
  const newExercise = new ExerciseMaster({
    ...excersiseDetail,
    archive: false,
  });
  const result = await newExercise.save();
  return {
    _id: result._id,
    name: result.name,
    topicId: result.topicId,
    topicName: result.topicName,
    day: result.day,
  };
};
// update on exercise will only take new exercise name and exercise ID
const updateExerciseMaster = async (exerciseId, newData) => {
  const updatedInfo = {
    name: newData.name,
  };
  const query = {
    _id: exerciseId,
  };
  const opts = { runValidators: true };
  const result = await ExerciseMaster.update(query, { $set: updatedInfo }, opts);
  return result.id;
};

const deleteExerciseMaster = async (exerciseId) => {
  const updatedInfo = {
    archive: true,
  };
  const query = {
    _id: exerciseId,
  };
  const opts = { runValidators: true };
  const result = await ExerciseMaster.update(query, { $set: updatedInfo }, opts);
  return result;
};

export {
  getAllExerciseMaster,
  insertNewExercise,
  updateExerciseMaster,
  deleteExerciseMaster,
};
